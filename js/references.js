/* References & copyright page — loads the attribution registry and renders
   the grouped tables; every row carries its own info icon (shared popup). */
import { loadReferences, renderReferenceTables } from "./reference-ui.js";

const container = document.getElementById("reference-tables");

async function boot() {
  renderReferenceTables(container, await loadReferences());
}

boot();
