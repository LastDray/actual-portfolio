// ===== КОНСТАНТЫ ДЛЯ НАСТРОЙКИ МОДЕЛИ ДЕВУШКИ =====

// Базовые размеры экрана для расчета масштабирования
export const BASE_SCREEN_WIDTH = 1440; // Ширина экрана, на котором модель имеет базовый размер

// Базовые параметры модели на десктопе
export const DESKTOP_BASE_SCALE = 2; // Базовый размер модели на 1440px экране
export const DESKTOP_BASE_POSITION_X = 0.9; // Базовая позиция X (чем меньше, тем левее)
export const DESKTOP_BASE_POSITION_Y = -1.7; // Базовая позиция Y (вертикальное смещение)
export const DESKTOP_BASE_POSITION_Z = 2; // Базовая позиция Z (глубина)

// Ограничения масштабирования на десктопе
export const DESKTOP_MAX_SCALE_MULTIPLIER = 1.1; // Максимальный коэффициент увеличения (1.1 = +10%)
export const DESKTOP_MAX_POSITION_X = 1.3; // Максимальная позиция X (ограничивает смещение вправо)

// Параметры для мобильных устройств
export const MOBILE_BREAKPOINT = 767; // Ширина экрана, ниже которой применяются мобильные настройки
export const MOBILE_MIN_SCALE = 2.2; // Минимальный размер модели на мобильных
export const MOBILE_MAX_SCALE = 3.7; // Максимальный размер модели на мобильных
export const MOBILE_SCALE_DIVISOR = 1; // Делитель для расчета размера (чем больше, тем меньше модель)
export const MOBILE_POSITION_X = 0; // Позиция X на мобильных (0 = по центру)
export const MOBILE_POSITION_Y = -2.8; // Позиция Y на мобильных (вертикальное смещение)
export const MOBILE_POSITION_Z = 0; // Позиция Z на мобильных (глубина)

// Параметры анимации поворота
export const DESKTOP_BASE_ROTATION_X = 0.25; // Базовый поворот по X на десктопе
export const DESKTOP_BASE_ROTATION_Y = -0.3; // Базовый поворот по Y на десктопе
export const MOBILE_BASE_ROTATION_X = 0.2; // Базовый поворот по X на мобильных
export const MOBILE_BASE_ROTATION_Y = 0; // Базовый поворот по Y на мобильных
export const MOUSE_SENSITIVITY_X = 0.01; // Чувствительность мыши по X
export const MOUSE_SENSITIVITY_Y = 0.3; // Чувствительность мыши по Y
export const ROTATION_LERP_FACTOR = 0.05; // Скорость плавного поворота (0.01-0.1)
