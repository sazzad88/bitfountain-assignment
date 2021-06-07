export const message = (message: string, seconds?: number): void => {
  var temp = document.createElement("div");
  temp.classList.add("message-notice");
  temp.innerHTML = `<div class="message">
  <i class="fas fa-check-square"></i> ${message}</div>`;
  var current_app_body = document.querySelector("body")!;
  current_app_body.append(temp);

  setTimeout(() => {
    temp.classList.add("message-open");
  }, 500);

  setTimeout(() => {
    temp.classList.remove("message-open");
    temp.remove();
  }, seconds ?? 3 * 1000);
};
