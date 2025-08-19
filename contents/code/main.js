let followingWindows = [];

function moveWindowToCurrentDesktop(oldDesktop) {
  const currentDesktop = workspace.currentDesktop;
  followingWindows = followingWindows.filter(w => {
    return w && w.pid;
  });
  followingWindows.forEach(w => {
    w.desktops = w.desktops.map(d => {
      if (d === oldDesktop) {
        return currentDesktop;
      }
      return d;
    })
  })
}

function addFollowingWindow() {
  const w = workspace.activeWindow;

  if (w.specialWindow) {
    return;
  }

  console.debug(`Toggle 'follow desktop' for window ${w.className}`);

  const idx = followingWindows.indexOf(w);

  if (idx === -1) {
    followingWindows.push(w);
  } else {
    followingWindows.splice(idx, 1);
  }

  console.debug("Toggle done.");
}

this.registerShortcut(
  "Window: follow desktop",
  "Toggle 'follow current desktop' for active window",
  "window-toggle-follow-desktop",
  addFollowingWindow
);

workspace.currentDesktopChanged.connect(moveWindowToCurrentDesktop);

