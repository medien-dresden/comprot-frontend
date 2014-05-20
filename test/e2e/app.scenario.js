describe('application', function() {

    browser.get('index.html');

    it('should automatically redirect to /dashboard when location fragment is empty', function() {
        expect(browser.getLocationAbsUrl()).toMatch("/dashboard");
    });

});