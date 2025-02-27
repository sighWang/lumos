// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Lumos Docs",
  tagline: "Full featured JavaScript(TypeScript) based dApp library for Nervos CKB",
  url: "https://nervosnetwork.github.io",
  baseUrl: "/lumos/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "nervosnetwork", // Usually your GitHub org/user name.
  projectName: "lumos", // Usually your repo name.

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "../docs",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/nervosnetwork/lumos/tree/develop/docusaurus/website/",
        },
        blog: {
          showReadingTime: true,
          editUrl:
            "https://github.com/nervosnetwork/lumos/tree/develop/docusaurus/website/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Lumos Docs",
        // TODO need a logo
        // logo: {
        //   alt: "Lumos Docs",
        //   src: "img/logo.svg",
        // },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Docs",
          },
          // { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/nervosnetwork/lumos",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/intro",
              },
              {
                label: "RFCs",
                href: "https://github.com/nervosnetwork/rfcs",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "CKB",
                href: "https://github.com/nervosnetwork/ckb",
              },
              {
                label: "GitHub",
                href: "https://github.com/nervosnetwork/lumos",
              },
            ],
          },
        ],
        // copyright: `Copyright © ${new Date().getFullYear()} Lumos, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
