function downloadFile(data, fileName) {
  const blob = new Blob([data], { type: "text/plain" });
  const tempEl = document.createElement("a");
  tempEl.style.display = "none";
  tempEl.href = URL.createObjectURL(blob);
  tempEl.download = fileName;
  document.body.appendChild(tempEl);
  tempEl.click();
  document.body.removeChild(tempEl);
  URL.revokeObjectURL(tempEl.href);
}

export { downloadFile };
