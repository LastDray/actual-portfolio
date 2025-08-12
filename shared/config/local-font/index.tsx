import localFont from "next/font/local";

export const MontserratFont = localFont({
  src: [
    {
      path: "../../../public/fonts/Montserrat-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Montserrat-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Montserrat-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Montserrat-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});
