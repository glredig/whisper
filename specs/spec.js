mocha.setup('bdd');
var expect = chai.expect;

function click(el){
    var ev = document.createEvent("MouseEvent");
    ev.initMouseEvent(
        "click",
        true /* bubble */, true /* cancelable */,
        window, null,
        0, 0, 0, 0, /* coordinates */
        false, false, false, false, /* modifier keys */
        0 /*left*/, null
    );
    el.dispatchEvent(ev);
}

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
    click(test_el);
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
    click(test_el);
    expect(test_var).to.not.be.ok;
	})
})