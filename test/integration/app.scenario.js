describe('application', function() {

    browser.get('index.html');

    it('should automatically redirect to /overview when location hash/fragment is empty', function() {
        expect(browser.getLocationAbsUrl()).toMatch("/overview");
    });

});