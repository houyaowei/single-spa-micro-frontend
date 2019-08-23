/**
 * application  entry
 * 1、sub app registration
 * 2、global event distributor registration
 */
import "zone.js";
import * as singleSpa from "single-spa";
import { GlobalEventdistributor } from "./globalEventdistributor";
import { loadApp } from "./loader";
import "./style.css";

async function init() {
  let globalEventdistributor = new GlobalEventdistributor();

  let applications = [];
  applications.push(
    loadApp(
      "reactApp",
      "/reactApp",
      "/reactApp/entry.js",
      "/reactApp/store.js",
      globalEventdistributor
    )
  );
  applications.push(
    loadApp("vueApp", "/vueApp", "/vueApp/entry.js", "/vueApp/store.js", globalEventdistributor)
  );

  await Promise.all(applications);

  singleSpa.start();
}
init();
