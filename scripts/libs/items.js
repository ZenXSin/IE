function newItem(name) {
	exports[name] = (() => {
		let myItem = extend(Item, name, {});
		return myItem;
	})();
}
newItem("铝");
newItem("精炼铝");
newItem("精炼铜");
newItem("精炼钛");