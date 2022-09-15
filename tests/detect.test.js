const { createWorker } = Tesseract;
let worker;
before(async function cb() {
  this.timeout(0);
  worker = await createWorker(OPTIONS);
  return worker.load();
});

describe('detect()', async () => {
  it('should detect OSD', () => {
    [
      { name: 'cosmic.png', ans: { script: 'Latin' } },
    ].forEach(async ({ name, ans: { script } }) => {
      await worker.loadLanguage('osd');
      await worker.initialize('osd');
      const { data: { script: s } } = await worker.detect(`${IMAGE_PATH}/${name}`);
      expect(s).to.be(script);
    });
  }).timeout(TIMEOUT);
});
