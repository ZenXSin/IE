function i(name) {
    return extend(Item, name, {});
}

TechTree.nodeRoot("科技树", i("基础力"), () => {
    TechTree.node(i("电磁力"));
    TechTree.node(i("引力"));
    TechTree.node(i("弱相互作用力"));
    TechTree.node(i("强相互作用力"));
});