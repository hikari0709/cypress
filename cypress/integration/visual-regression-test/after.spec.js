
describe('after screenshot', function() {
  const config = require('../../fixtures/visual-regression-test/config.json');
  const domain = 'https://hikkoshizamurai.jp/';
  const ss_dir = 'after';
  var test_id = '';
  var ss_path = '';
  var url = '';

  config.pages.forEach(({ test_id, uri }) => {
    config.viewports.forEach(({ name, width, height }) => {
      context(test_id, () => {
        beforeEach(() => {
          url = domain + uri;
          cy.visit(url);
        });

        it('take screenshot', function () {
          ss_path = ss_dir + '/' + test_id;
          cy.wait(Cypress.env('ss_wait_msec'));
          cy.viewport(width, height);
          cy.viewport('iphone-6');
          cy.scrollTo('bottom');
          cy.screenshot(ss_path, {
            onBeforeScreenshot($el) {
              const $sticky = $el.find('#js-float-container');
              if ($sticky) {
                $sticky.hide();
              }
            },
            capture: Cypress.env('ss_capture')
          });
        });
      });
    });
  });
})
