function sleep(mills) {
  return new Promise((resolve) => {
    setTimeout(resolve, mills);
  });
}

export { sleep };
