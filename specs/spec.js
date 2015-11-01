mocha.setup('bdd');
var expect = chai.expect;

describe('add listener', function () {

  it('adds an id to element', function () {
    var test_el = document.getElementById("test_el");
    $W(test_el).on('click', function() {
    	//
    });
    var whisper_id = test_el.getAttribute("data-whisper-id");
    expect(whisper_id).to.be.ok;
  });

  it('adds a click listener', function() {
  	var test_var = '';
  	var test_el = document.getElementById("test_el");
    $W(test_el).on('click', function() {
    	test_var = true;
    });
    test_el.click();
    expect(test_var).to.be.ok;
  });
});

describe('remove listener', function() {
	it('removes click listener', function() {
		var test_var = '';
  	var test_el = document.getElementById("test_el");
    $W(test_el).on('click', function() {
    	test_var = true;
    });
    $W(test_el).off('click');
    test_el.click();
    expect(test_var).to.not.be.ok;
	})
})