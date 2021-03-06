/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
	/* This is our first test suite - a test suite just contains
	* a related set of tests. This suite is all about the RSS
	* feeds definitions, the allFeeds variable in our application.
	*/
	describe('RSS Feeds', function() {
		var len = allFeeds.length;

		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. Experiment with this before you get started on
		 * the rest of this project. What happens when you change
		 * allFeeds in app.js to be an empty array and refresh the
		 * page?
		 */

		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		/* TODO: Write a test that loops through each feed
		 * in the allFeeds object and ensures it has a URL defined
		 * and that the URL is not empty.
		 */

		function testFeedUrls(index) {
			it('Feed[' + index + '].url defined and not empty', function() {
				expect(allFeeds[index].url).toBeDefined();
				expect(allFeeds[index].url.length).toBeGreaterThan(0);
			});
		}

		for (var i = 0; i < len; i++) {
			testFeedUrls(i);
		}

		/* TODO: Write a test that loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		 */

		function testFeedNames(index) {
			it('Feed[' + index + '].name defined and not empty', function() {
				expect(allFeeds[index].name).toBeDefined();
				expect(allFeeds[index].name.length).toBeGreaterThan(0);
			});
		}

		for (var i = 0; i < allFeeds.length; i++) {
			testFeedNames(i);
		}
	});


	/* TODO: Write a new test suite named "The menu" */
	describe('The menu', function() {
		var menuIcon = $('.menu-icon-link');
		var body = $('body');

		/* TODO: Write a test that ensures the menu element is
		 * hidden by default. You'll have to analyze the HTML and
		 * the CSS to determine how we're performing the
		 * hiding/showing of the menu element.
		 */

		it('is hidden by default', function() {
			expect(body.hasClass('menu-hidden')).toBe(true);
		});

		/* TODO: Write a test that ensures the menu changes
		 * visibility when the menu icon is clicked. This test
		 * should have two expectations: does the menu display when
		 * clicked and does it hide when clicked again.
		 */

		it('visibility toggles when menu icon clicked', function() {
			// hidden to start
			expect(body.hasClass('menu-hidden')).toBe(true);
			menuIcon.click();
			expect(body.hasClass('')).toBe(true);
			menuIcon.click();
			expect(body.hasClass('menu-hidden')).toBe(true);
		});
	});

	/* TODO: Write a new test suite named "Initial Entries" */
	describe('Initial Entries', function() {

		// console.log('length of entry = ', $('.entry').length);

		/* Initialize the feed in beforeEach to the first feed.
		 * Test the length of entry when it is done.
		 */

		beforeEach(function(done) {
			loadFeed(0, function() {
				done();
			});
		});

		/* TODO: Write a test that ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 * Remember, loadFeed() is asynchronous so this test will require
		 * the use of Jasmine's beforeEach and done() function.
		 */

		it('at least one entry in .feed container', function() {
			// console.log('length of entry = ', $('.entry').length);
			expect($('.entry').length).toBeGreaterThan(0);
		});

	});

	/* TODO: Write a new test suite named "New Feed Selection" */
	describe('New Feed Selection', function() {

		var initialTitle;
		var nextTitle;
		var index;
		var len = allFeeds.length;

		/* Initialize the feed to the first feed (index = 0).
		 * Test the other feeds against this one to see that the
		 * content has changed.
		 */

		beforeEach(function(done) {
			loadFeed(0, function() {
				initialTitle = $('.header-title').html();
				// console.log('initialTitle (index  = 0) = ', initialTitle);
				done();
			});
		});

		/* At the end, go back to the first entry for user viewing */
		afterAll(function() {
			loadFeed(0);
		});

		/* TODO: Write a test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 * Remember, loadFeed() is asynchronous.
		 */

		function feedSelectTest(index) {
			 it('content (feed ' + index + ') has changed from feed 0',function(done) {
				loadFeed(index, function() {
					nextTitle = $('.header-title').html();
					// console.log('nextTitle (index  = ' + index + ') = ', nextTitle);
					expect(nextTitle).not.toBe(initialTitle);
					done();
				});
			});
		}

		for (var i = 1; i < len; i++) {
			feedSelectTest(i);
		}
	});
}());
