/**
 * @fileOverview Lucky draw system unit test file
 * Date: 2013-1-25
 */

/**
 * @class The unit test of the drawing system
 */
var UnitTest = {
	// The valid range of random index is [0, CandidateList.length)
	TestCalculateRandomIndex: function() {
		// set up the test data
		var times = 5000;
		var indexList = [];
		for (var i = 0; i < times; ++i) {
			var index = App.CalculateRandomIndex();
			indexList.push(index);
		}
		
		if (typeof indexList.indexOf == "undefined")
			return;
		
		// check whether specified valid indices exist
		var validIndexList = [0, CandidateList.length-1, parseInt(0.5*(CandidateList.length-1))];
		for (var i = 0, count = validIndexList.length; i < count; ++i) {
			Assert(indexList.indexOf(validIndexList[i]) != -1, "TestCalculateRandomIndex() failed, the index " +  validIndexList[i] + " does not exist.");
		}
		
		// check for specified invalid indices
		var invalidIndexList = [-1, CandidateList.length, CandidateList.length*2];
		for (var i = 0, count = invalidIndexList.length; i < count; ++i) {
			Assert(indexList.indexOf(invalidIndexList[i]) == -1, "TestCalculateRandomIndex() failed, the invalid index " + invalidIndexList[i] + " should not exist.");
		}
	},
	// Test the whole drawing process
	TestDrawProcess: function() {
		App._EmulateDrawProcess();
	},
	// Verify the drawing result
	TestResultContent: function() {
		Assert($("#tableOUT>li:first-child>span.oTitle").eq(0).text() != "", "The prize title in result tab is invalid.");
		Assert($("#tableOUT>li:first-child>span.oMain").eq(0).text() != "", "The candidate in result tab is invalid.");
	}
}

// Emulate the drawing process
App._EmulateDrawProcess = function() {
	if (App.GetCurPrizeGrade() >= PrizeSettings.length - 1) {
		Assert(App.GetCurPrizeGrade() >= 0, "The current prize grade is wrong.");
		UnitTest.TestResultContent();
		return;
	}

	App.StartDrawEngine();
	App.Starts();
	
	Assert($(UIResourceSelector.CandidateInputs).eq(0).val() == "888", "The initialize name of each candidate should be 888.");
	
	var timeInterval = 200;
	// Iterate current prize grade, draw for all candidates
	var count = PrizeSettings[App.GetCurPrizeGrade()].count;
	for (var i = 0; i < count; ++i) {
		setTimeout(function() {
			App.Stops();
		}, timeInterval*(i+1));
		setTimeout(function() {
			Assert($(UIResourceSelector.CandidateInputs).eq(0).val(), "The candidate name should not be 888.");
		}, timeInterval*(i+1)+10);
	}
	
	setTimeout(App._EmulateDrawProcess, timeInterval*PrizeSettings[App.GetCurPrizeGrade()].count);
}

/**
 * @description Run all the unit test methods
 */
var UnitTestRunner = {
	run: function() {
		UnitTest.TestCalculateRandomIndex();
		UnitTest.TestDrawProcess();
	}
};

// run all the test cases
$(function() {
	//UnitTestRunner.run();
});

// Assert the condition, show error message when the condition fails.
var Assert = function(condition, errorMsg) {
	if (!condition) {
		Logger.Log(errorMsg);
	}
}

/**
 * @class Logger system
 */
var Logger = {
	TAG: "CloudDrawingSystem: ",
	mEnabled: false,
	
	SetEnabled: function(flag) {
		this.mEnabled = flag;
	},
	IsEnabled: function() {
		return this.mEnabled;
	},
	Log: function(msg) {
		if (typeof console != "undefined" && typeof console.log != "undefined")
			console.log(this.TAG + msg);
	}
}

