declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "aos";
declare module "*.png";
declare module "*.webp";
declare module "*.jpg";
declare module "*.avif";
declare module "*.jpeg";

declare module "swiper/css";
declare module "swiper/css/effect-coverflow";
declare module "swiper/css/navigation";
declare module "swiper/css/pagination";
declare module "swiper/css/free-mode";
declare module "swiper/css/thumbs";
