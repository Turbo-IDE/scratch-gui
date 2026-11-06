export default async function ({ addon, console }) {
  const vm = addon.tab.traps.vm;
  const WOW_ECONOMY_URL =
    "https://editor.turboshare.org.uk/static/turboshare-extensions/WOWEconomy.js";
  const loadWOWEconomy = async () => {
    if (addon.self.disabled) return;
    if (addon.settings.get("wow-economy") === false) return;
    try {
      await vm.extensionManager.loadExtensionURL(WOW_ECONOMY_URL);
    } catch (e) {
      console.error("Failed to load WOW Economy extension", e);
    }
  };
  if (vm.editingTarget) {
    loadWOWEconomy();
  } else {
    vm.runtime.once("PROJECT_LOADED", loadWOWEconomy);
  }
}
