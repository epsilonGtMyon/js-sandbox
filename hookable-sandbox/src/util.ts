async function sleep(mills: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, mills);
  });
}

export { sleep };
