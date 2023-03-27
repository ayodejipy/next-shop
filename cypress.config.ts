import { defineConfig } from "cypress";

export default defineConfig({
    viewportWidth: 1024,
    viewportHeight: 660,
    component: {
        devServer: {
            framework: "next",
            bundler: "webpack",
        },
    },
});
