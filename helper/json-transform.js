import json2html from "node-json2html";
const { render, component } = json2html;
import { localGetURLS } from "../controllers/urls.js";

let template_table_header = {
  "<>": "tr",
  html: [
    { "<>": "th", html: "urlId" },
    { "<>": "th", html: "Original URL" },
    { "<>": "th", html: "Short URL" },
    { "<>": "th", html: "Clipboard" },
    { "<>": "th", html: "Hits" },
    { "<>": "th", html: "QR Image" },
    { "<>": "th", html: "Date(CET)" },
    { "<>": "th", html: "Delete short URL" },
  ],
};
/*
let template_table_body = {
  "<>": "tr",
  html: [
    { "<>": "td", html: "${urlId}" },
    { "<>": "td", html: "${origUrl}" },
    {
      "<>": "td",
      html: [{ "<>": "a", href: "${shortUrl}", text: "${shortUrl}" }],
    },
    { "<>": "td", html: "${hits}" },
    { "<>": "td", html: "${qrUrl}" },
    { "<>": "td", html: "${date}" },
  ],
};
*/

let template_table_body = {
  "<>": "tr",
  html: [
    { "<>": "td", label: "URL ID", html: "${urlId}" },
    {
      "<>": "td",
      label: "Original URL",
      html: [
        {
          "<>": "a",
          target: "_blank",
          href: "${origUrl}",
          text: "${origUrl}",
        },
      ],
    },
    {
      "<>": "td",
      label: "Short URL",
      html: [
        {
          "<>": "a",
          target: "_blank",
          class: "shortlinks",
          href: "${shortUrl}",
          text: "${shortUrl}",
        },
      ],
    },
    {
      "<>": "td",
      label: "Copy",
      html: [
        {
          "<>": "button",
          html: "Copy",
          class: "priv-copy btn",
          id: "${urlId}",
        },
      ],
    },
    { "<>": "td", label: "Hits", html: "${hits}" },
    {
      "<>": "td",
      label: "Download QR",
      html: [
        {
          "<>": "a",
          download: "${urlId}.png",
          href: "${qrUrl}",
          html: [{ "<>": "text", html: "Download QR" }],
        },
      ],
    },
    { "<>": "td", label: "Date", html: "${date}" },
    {
      "<>": "td",
      label: "Delete",
      html: [
        {
          "<>": "button",
          html: "Delete",
          class: "priv-del btn",
          id: "${urlId}",
        },
      ],
    },
  ],
};

const htmlFromJson = async (data) => {
  let table_header = await json2html.transform(data[0], template_table_header);
  let table_body = await json2html.transform(data, template_table_body);

  let body =
    '<table id="my_table">\n<thead>' +
    table_header +
    "\n</thead>\n<tbody>\n" +
    table_body +
    "\n</tbody>\n</table>";
  return body;
};

export { htmlFromJson };
