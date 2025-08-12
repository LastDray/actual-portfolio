import { useRef, useEffect } from "react";

export const useRippleAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;

    const ctx = c.getContext("2d")!;
    let cW: number;
    let cH: number;
    let bgColor = "#FF6138";
    const dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      cW = c.clientWidth;
      cH = c.clientHeight;
      c.width = cW * dpr;
      c.height = cH * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const colors = ["#FF6138", "#E6A743", "#2980B9", "#282741"];
    let colorIndex = 0;
    const colorPicker = {
      current: () => colors[colorIndex],
      next: () => {
        colorIndex = (colorIndex + 1) % colors.length;
        return colors[colorIndex];
      },
    };

    interface CircleProps {
      x: number;
      y: number;
      r: number;
      fill?: string;
      stroke?: { width: number; color: string };
      opacity?: number;
    }

    class Circle implements CircleProps {
      x: number;
      y: number;
      r: number;
      fill?: string;
      stroke?: { width: number; color: string };
      opacity: number = 1;

      constructor(opts: CircleProps) {
        this.x = opts.x;
        this.y = opts.y;
        this.r = opts.r;
        this.fill = opts.fill;
        this.stroke = opts.stroke;
        if (opts.opacity !== undefined) this.opacity = opts.opacity;
      }

      draw() {
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        if (this.stroke) {
          ctx.strokeStyle = this.stroke.color;
          ctx.lineWidth = this.stroke.width;
          ctx.stroke();
        }
        if (this.fill) {
          ctx.fillStyle = this.fill;
          ctx.fill();
        }
        ctx.closePath();
        ctx.globalAlpha = 1;
      }
    }

    interface Animatable {
      target: Circle;
      propStates: Map<string, { from: number; to: number }>;
    }

    interface Anim {
      animatables: Animatable[];
      duration: number;
      easing: (t: number) => number;
      complete?: () => void;
      startTime: number;
      completed: boolean;
    }

    const animations: Anim[] = [];

    const removeAnimation = (anim: Anim) => {
      const index = animations.indexOf(anim);
      if (index > -1) animations.splice(index, 1);
    };

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const random = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const calcPageFillRadius = (x: number, y: number) => {
      const l = Math.max(x, cW - x);
      const h = Math.max(y, cH - y);
      return Math.sqrt(l * l + h * h);
    };

    const handleEvent = (e: MouseEvent | TouchEvent) => {
      if ("touches" in e) {
        e.preventDefault();
      }
      const rect = c.getBoundingClientRect();
      const ev = "touches" in e ? e.touches[0] : (e as MouseEvent);
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;

      const currentColor = colorPicker.current();
      const nextColor = colorPicker.next();
      const targetR = calcPageFillRadius(x, y);
      const rippleSize = Math.min(200, cW * 0.4);
      const minCoverDuration = 750;

      const pageFill = new Circle({
        x,
        y,
        r: 0,
        fill: nextColor,
      });
      const fillAnimation = myAnimate({
        targets: pageFill,
        props: { r: targetR },
        duration: Math.max(targetR / 2, minCoverDuration),
        easing: easeOutQuart,
        complete: () => {
          bgColor = nextColor;
          removeAnimation(fillAnimation);
        },
      });

      const ripple = new Circle({
        x,
        y,
        r: 0,
        fill: currentColor,
        stroke: {
          width: 3,
          color: currentColor,
        },
        opacity: 1,
      });
      const rippleAnimation = myAnimate({
        targets: ripple,
        props: { r: rippleSize, opacity: 0 },
        easing: easeOutExpo,
        duration: 900,
        complete: () => removeAnimation(rippleAnimation),
      });

      const particles: Circle[] = [];
      for (let i = 0; i < 32; i++) {
        const particle = new Circle({
          x,
          y,
          fill: currentColor,
          r: random(24, 48),
        });
        particles.push(particle);
      }
      const particlesAnimation = myAnimate({
        targets: particles,
        props: {
          x: (particle: Circle) => particle.x + random(-rippleSize, rippleSize),
          y: (particle: Circle) =>
            particle.y + random(-rippleSize * 1.15, rippleSize * 1.15),
          r: 0,
        },
        easing: easeOutExpo,
        duration: random(1000, 1300),
        complete: () => removeAnimation(particlesAnimation),
      });

      animations.push(fillAnimation, rippleAnimation, particlesAnimation);
    };

    interface AnimateOptions {
      targets: Circle | Circle[];
      props: Record<string, number | ((target: Circle) => number)>;
      duration: number;
      easing: (t: number) => number;
      complete?: () => void;
    }

    const myAnimate = (options: AnimateOptions): Anim => {
      const targetsArr = Array.isArray(options.targets)
        ? options.targets
        : [options.targets];
      const animatables: Animatable[] = targetsArr.map((target) => {
        const propStates = new Map<string, { from: number; to: number }>();
        for (const key in options.props) {
          const value = options.props[key];
          const to = typeof value === "function" ? value(target) : value;
          const from = (target as any)[key] ?? 0;
          propStates.set(key, { from, to });
        }
        return { target, propStates };
      });

      const anim: Anim = {
        animatables,
        duration: options.duration,
        easing: options.easing,
        complete: options.complete,
        startTime: performance.now(),
        completed: false,
      };

      animations.push(anim);
      return anim;
    };

    let raf: number;
    const animateLoop = () => {
      const now = performance.now();
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, cW, cH);

      const toComplete: Anim[] = [];
      animations.forEach((anim) => {
        const elapsed = now - anim.startTime;
        const progress = Math.min(elapsed / anim.duration, 1);
        const eased = anim.easing(progress);

        anim.animatables.forEach((ani) => {
          ani.propStates.forEach((state, key) => {
            (ani.target as any)[key] =
              state.from + (state.to - state.from) * eased;
          });
          ani.target.draw();
        });

        if (progress >= 1 && !anim.completed) {
          toComplete.push(anim);
        }
      });

      toComplete.forEach((anim) => {
        anim.completed = true;
        if (anim.complete) anim.complete();
      });

      raf = requestAnimationFrame(animateLoop);
    };
    animateLoop();

    c.addEventListener("touchstart", handleEvent);
    c.addEventListener("mousedown", handleEvent);

    let inactive: NodeJS.Timeout;
    const setInactive = () => {
      inactive = setTimeout(() => {
        fauxClick(cW / 2, cH / 2);
      }, 2000);
    };

    const clearInactiveTimeout = () => {
      clearTimeout(inactive);
      c.removeEventListener("mousedown", clearInactiveTimeout);
      c.removeEventListener("touchstart", clearInactiveTimeout);
    };

    c.addEventListener("mousedown", clearInactiveTimeout);
    c.addEventListener("touchstart", clearInactiveTimeout);
    setInactive();

    const fauxClick = (x: number, y: number) => {
      const rect = c.getBoundingClientRect();
      const event = new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(event, "clientX", { value: rect.left + x });
      Object.defineProperty(event, "clientY", { value: rect.top + y });
      c.dispatchEvent(event);
    };

    if (!!window.location.pathname.match(/fullcpgrid/)) {
      const startFauxClicking = () => {
        setTimeout(() => {
          fauxClick(random(cW * 0.2, cW * 0.8), random(cH * 0.2, cH * 0.8));
          startFauxClicking();
        }, random(200, 900));
      };
      startFauxClicking();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resizeCanvas);
      c.removeEventListener("touchstart", handleEvent);
      c.removeEventListener("mousedown", handleEvent);
      c.removeEventListener("mousedown", clearInactiveTimeout);
      c.removeEventListener("touchstart", clearInactiveTimeout);
      clearTimeout(inactive);
    };
  }, []);

  return canvasRef;
};
