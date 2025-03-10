import { denoServerAdapter } from "@builder.io/qwik-city/adapters/deno-server/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";
import baseConfig from "../../vite.config";

const viteEnv = {}
Object.keys(process.env).forEach((key) => {
  if (key.startsWith(`VITE_`)) {
    viteEnv[`import.meta.env.${key}`] = process.env[key]
  }
})

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["src/entry.deno.ts", "@qwik-city-plan"],
      },
      minify: false,
    },
    define: viteEnv,
    plugins: [
      denoServerAdapter({
        ssg: {
          include: ["/*"],
          origin: "https://qwik-docker.deno.dev",
        },
      }),
    ],
  };
});