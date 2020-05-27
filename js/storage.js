/* Handle local storage and display of theme settings */

const children = Array.from(document.querySelector(".controls").children)
const bgColour = localStorage.getItem("bg-colour")
const txtColour = localStorage.getItem("txt-colour")
const fntWeight = localStorage.getItem("fnt-weight")
const bdrColour = localStorage.getItem("bdr-colour")
const option = localStorage.getItem("option")

if (bgColour) document.body.style.backgroundColor = bgColour

if (option) document.getElementById("color-scheme").value = option

children.forEach((child) => {
  if (txtColour) child.style.color = txtColour
  if (fntWeight) child.style.fontWeight = fntWeight
  if (bdrColour) child.style.borderColor = bdrColour
  if (bgColour) child.style.backgroundColor = bgColour
})
