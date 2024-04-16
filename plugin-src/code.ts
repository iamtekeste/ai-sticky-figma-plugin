figma.showUI(__html__, { themeColors: true, height: 200 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === "create-stickies") {
    await figma.loadFontAsync({ family: "Inter", style: "Medium" });
    const nodes = [];

    for (let i = 0; i < msg.stickies.length; i++) {
      const sticky = figma.createSticky();
      sticky.text.characters = msg.stickies[i].text.replace(/\n/g, " ");
      sticky.x = i * 300;

      sticky.fills = [
        { type: "SOLID", color: figma.util.rgb(msg.stickies[i].color) },
      ];
      figma.currentPage.appendChild(sticky);
      nodes.push(sticky);
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }
};
