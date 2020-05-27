/* Functions for display interactivity */

/**
 * Save the selected theme to localStorage to persist across page refreshes
 * @param {String} theme - default of null, else string
 */
const saveTheme = (theme = null) => {
  localStorage.clear()
  if (theme) {
    localStorage.setItem("option", theme)
    localStorage.setItem("fnt-weight", "bold")
    if (theme === "night") {
      localStorage.setItem("bg-colour", "black")
      localStorage.setItem("txt-colour", "#3CB371")
      localStorage.setItem("bdr-colour", "black")
    } else if (theme === "win98") {
      localStorage.setItem("bg-colour", "#007D7E")
      localStorage.setItem("txt-colour", "white")
      localStorage.setItem("fnt-weight", "bold")
      localStorage.setItem("bdr-colour", "#007D7E")
    }
  } else {
    localStorage.setItem("option", "default")
  }
}

/**
 * Set the default white theme
 * @param {Array} controlsChildren - child elements of the controls div
 */
const setDefaultTheme = (controlsChildren) => {
  document.body.style.backgroundColor = "white"
  controlsChildren.forEach((child) => {
    child.style.color = "black"
    child.style.backgroundColor = null
    child.style.fontWeight = null
    child.style.border = null
  })
}

/**
 * Set the night theme, save to local storage
 * @param {Array} controlsChildren - child elements of the controls div
 */
const setNightTheme = (controlsChildren) => {
  document.body.style.backgroundColor = "black"
  controlsChildren.forEach((child) => {
    child.style.color = "#3CB371"
    child.style.backgroundColor = "black"
    child.style.borderColor = "black"
    child.style.fontWeight = "bold"
  })
}

/**
 * Set the win98 theme, save to local storage
 * @param {Array} controlsChildren - child elements of the controls div
 */
const setWin98Theme = (controlsChildren) => {
  document.body.style.backgroundColor = "#007D7E"
  controlsChildren.forEach((child) => {
    child.style.color = "white"
    child.style.backgroundColor = "#007D7E"
    child.style.borderColor = "#007D7E"
    child.style.fontWeight = "bold"
  })
}

/**
 * Set the size of the gameArea based on level
 * @param {String} level - beginner, intermediate, or expert
 */
const setGameAreaSize = (level) => {
  const gameArea = document.getElementById("gameArea")
  if (level === "beginner") {
    gameArea.style.width = "287px"
    gameArea.style.height = null
  } else if (level === "intermediate") {
    gameArea.style.width = "502.25px"
    gameArea.style.height = "578.75px"
  } else if (level === "expert") {
    gameArea.style.width = "932.75px"
  }
}

/**
 * Set the zoom property of the body
 * @param {String} percentage - percentage in whole number as a string
 */
const zoom = (percentage) => {
  percentage = parseInt(percentage) / 100
  document.body.style.zoom = percentage
}
