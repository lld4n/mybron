import { defineConfig, splitVendorChunkPlugin } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import PrettyModuleClassnames from "vite-plugin-pretty-module-classnames";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    PrettyModuleClassnames(),
    splitVendorChunkPlugin(),
    svgLoader({
      svgoConfig: {
        multipass: true,
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
        ],
      },
    }),
  ],
});
