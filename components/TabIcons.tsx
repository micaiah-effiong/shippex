import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const Shipment = (props: SvgProps) => (
  <Svg width={26} height={25} fill="none" {...props}>
    <Path
      // fill="#A7A3B3"
      d="m6.811 13.304-.144 4.217-1.59-1.082-1.588.897.327-4.52-2.25-.31v9.477l8.289.942V13.64l-3.044-.337ZM20.61 1.21a.347.347 0 0 1 .246.044c.124.051.212.173.214.318l.071 9.763 3.64.478a.346.346 0 0 1 .246.045c.124.051.212.173.214.318l.07 10.007a.344.344 0 0 1-.166.312l-4.087 2.437a.349.349 0 0 1-.263.065l-10.606-1.18a.453.453 0 0 1-.075-.012l-9.088-1.168a.344.344 0 0 1-.328-.344V12.116a.343.343 0 0 1 .206-.326l4.785-2.106v-6.99a.343.343 0 0 1 .206-.326l5.32-2.34a.345.345 0 0 1 .183-.026l9.212 1.209Zm.201 10.776-3.198 1.909 3.176.405 3.042-1.917-3.02-.397ZM5.689 11.32v-.883l-3.393 1.491 1.947.248 1.446-.856Zm11.334-6.879v9.005l3.054-1.823.372-.315-.065-8.985-3.36 2.118Zm-.875 9.227V4.354l-4.34-.578L11.66 8.1 10.07 7.017l-1.589.897.328-4.52-2.433-.312v9.477l9.771 1.109Zm-.53-12.417L12.28 3.145l4.34.554 3.041-1.917-4.045-.53Zm-6.38 1.504L12.47.836l-1.066-.14-4.116 1.809 1.947.25ZM21.19 15.043v9.005l3.428-2.045-.067-9.078-3.361 2.118Zm-.875 9.227v-9.314l-4.34-.578-.148 4.323-1.589-1.082-1.589.897.328-4.52-2.25-.22v9.476l9.588 1.018Z"
    />
  </Svg>
);

export const BarCode = (props: SvgProps) => (
  <Svg width={32} height={25} fill="none" {...props}>
    <Path
      // fill="#A7A3B3"
      d="M.785 0h4.722v1.226h-4.11v3.205H.172V.613C.171.276.447 0 .785 0Zm4.003 4.181h2.128V20.82H4.788V4.18Zm13.265 0h1.52V20.82h-1.52V4.18Zm-2.945 0h1.14V20.82h-1.14V4.18Zm-6.386 0h.647V20.82h-.647V4.18Zm16.591 0h1.899V20.82h-1.899V4.18Zm-3.934 0h2.128V20.82H21.38V4.18Zm-10.204 0h2.128V20.82h-2.128V4.18ZM1.398 20.57v3.205h4.109V25H.785a.613.613 0 0 1-.614-.613v-3.818h1.227ZM26.81 0h4.405c.338 0 .613.276.613.613v3.818h-1.226V1.226H26.81V0Zm5.018 20.569v3.818a.615.615 0 0 1-.613.613H26.81v-1.226h3.792v-3.205h1.226Z"
    />
  </Svg>
);

export const Wallet = (props: SvgProps) => (
  <Svg width={32} height={25} fill="none" {...props}>
    <Path
      // fill="#A7A3B3"
      fillRule="evenodd"
      d="M23.2 8.22h4.539v-.688c-.71-2.647-2.517-2.63-4.75-2.607l-.72.007H5.3a.705.705 0 1 1 0-1.411h16.97c.5 0 .607 0 .708-.003 1.91-.02 3.578-.037 4.762 1.08v-.322c0-.79-.323-1.505-.844-2.026a2.861 2.861 0 0 0-2.026-.844H5.12c-.789 0-1.504.324-2.025.844a2.862 2.862 0 0 0-.844 2.026v16.441c0 .79.324 1.505.844 2.026.52.52 1.239.843 2.026.843h19.747c.79 0 1.505-.323 2.026-.843.52-.521.843-1.239.843-2.026v-2.334h-4.54c-1.369 0-2.615-.56-3.515-1.46-.9-.901-1.46-2.147-1.46-3.516v-.215c0-1.37.56-2.615 1.46-3.516a4.987 4.987 0 0 1 3.518-1.455Zm5.948.028c.51.076.967.318 1.315.668.429.43.693 1.022.693 1.673v5.33a2.472 2.472 0 0 1-2.008 2.425v2.375a4.267 4.267 0 0 1-1.256 3.023 4.267 4.267 0 0 1-3.023 1.255H5.12a4.267 4.267 0 0 1-3.022-1.255 4.257 4.257 0 0 1-1.255-3.02V4.278c0-1.177.48-2.248 1.255-3.022A4.267 4.267 0 0 1 5.12 0h19.747c1.177 0 2.248.481 3.022 1.256a4.267 4.267 0 0 1 1.256 3.022v3.97h.003Zm-6.56 3.128a1.808 1.808 0 1 1 0 3.616 1.808 1.808 0 0 1 0-3.616Z"
      clipRule="evenodd"
    />
  </Svg>
);

export const User = (props: SvgProps) => (
  <Svg width={26} height={25} fill="none" {...props}>
    <Path
      // fill="#A7A3B3"
      d="M12.99 0c3.458 0 6.57 1.404 8.828 3.662a12.47 12.47 0 0 1 3.662 8.828c0 3.458-1.404 6.57-3.662 8.828a12.47 12.47 0 0 1-17.656 0A12.4 12.4 0 0 1 .5 12.49c0-3.458 1.404-6.57 3.662-8.828A12.471 12.471 0 0 1 12.99 0ZM8.9 11.046c-.224 0-.407.06-.508.142a.361.361 0 0 0-.143.163.427.427 0 0 0-.04.284c0 .306.162.712.488 1.18l1.017 1.628c.407.65.834 1.322 1.383 1.81.509.468 1.14.793 1.953.793.895 0 1.546-.325 2.075-.834.549-.508.996-1.22 1.424-1.932l1.16-1.892c.223-.488.284-.813.243-1.017-.02-.122-.162-.163-.366-.183h-.386c-.102 0-.204 0-.326-.02l.387-1.75c-2.93.468-5.127-1.708-8.218-.427l.203 2.075c-.122 0-.244 0-.346-.02Zm-4.577 8.421c1.445-.508 3.987-.773 5.167-1.566.203-.265.427-.59.63-.875.123-.183.224-.346.326-.468l.061-.06c-.488-.51-.895-1.12-1.281-1.73L8.21 13.141c-.387-.57-.59-1.078-.59-1.485 0-.204.02-.387.101-.53a1.12 1.12 0 0 1 .346-.406c.081-.04.163-.102.244-.122a27.905 27.905 0 0 1-.04-2.93c.02-.223.06-.447.122-.67.264-.936.915-1.689 1.729-2.197.284-.183.59-.326.935-.448.59-.224.306-1.119.956-1.139 1.526-.04 4.028 1.261 5.004 2.319.57.61.936 1.424.997 2.502l-.06 2.665a.753.753 0 0 1 .548.549c.082.325 0 .773-.284 1.404 0 .02-.02.02-.02.04l-1.16 1.912c-.448.733-.916 1.485-1.526 2.055l-.02.02c.081.102.163.224.244.346.163.224.325.488.508.732 1.079.916 3.927 1.2 5.432 1.75a11.096 11.096 0 0 0 2.461-6.998 11.1 11.1 0 0 0-3.255-7.872 11.1 11.1 0 0 0-7.872-3.255 11.1 11.1 0 0 0-7.872 3.255 11.1 11.1 0 0 0-3.255 7.872 10.892 10.892 0 0 0 2.441 6.957Zm11.84-1.058c-.286-.325-.57-.752-.835-1.118-.081-.102-.142-.224-.224-.306-.549.407-1.22.672-2.095.672-.915 0-1.627-.326-2.217-.834 0 0 0 .02-.02.02-.102.142-.204.285-.326.468-.224.325-.468.671-.692.976.02 2.055 5.208 3.275 6.408.122Z"
    />
  </Svg>
);