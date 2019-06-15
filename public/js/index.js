// $.ajaxPrefilter(function(options) {
//     if (options.crossDomain && jQuery.support.cors) {
//         options.url = "https://cors-anywhere.herokuapp.com/" + options.url;
//     }
// });

// Get references to page elements
var $bookTitle = $("#book-title");
var $bookDescription = $("#book-description");
var $submitBtn = $("#submit");
var $bookList = $("#book-list");

// The API object contains methods for each kind of request we'll make
var API = {
    saveBook: function(book) {
        // move goodreads api call here

        return $.post("/api/books", book).then(function(response) {
            console.log(response);
        });
    },
    getBooks: function() {
        return $.ajax({
            url: "api/books",
            type: "GET"
        });
    },
    deleteBook: function(id) {
        return $.ajax({
            url: "api/books/" + id,
            type: "DELETE"
        });
    }
};

// refreshBooks gets new books from the db and repopulates the list
var refreshBooks = function() {
    API.getBooks().then(function(data) {
        var $books = data.map(function(book) {
            var $a = $("<a>")
                .text(book.title)
                .attr("href", "/book/" + book.id);

            var $li = $("<li>")
                .attr({
                    class: "list-group-item",
                    "data-id": book.id
                })
                .append($a);

            var $button = $("<button>")
                .addClass("btn btn-danger float-right delete")
                .text("ｘ");

            $li.append($button);

            return $li;
        });

        $bookList.empty();
        $bookList.append($books);
    });
};

// handleFormSubmit is called whenever we submit a new book
// Save the new book to the db and refresh the list
var handleFormSubmit = function(event) {
    event.preventDefault();

    var bookTitle = encodeURIComponent($bookTitle.val().trim());
    console.log(bookTitle);

    if (!bookTitle) {
        alert("You must enter an book title!");
        return;
    }

    // API.saveBook(book).then(function() {
    //     refreshBooks();
    // });
    //$.post("/api/temp", { title: bookTitle });
    var queryUrl =
		"https://www.googleapis.com/books/v1/volumes?q={" + bookTitle + "}";
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(queryUrl);
    });

    $bookTitle.val("");
};

// handleDeleteBtnClick is called when an book's delete button is clicked
// Remove the book from the db and refresh the list
var handleDeleteBtnClick = function() {
    var idToDelete = $(this)
        .parent()
        .attr("data-id");

    API.deleteBook(idToDelete).then(function() {
        refreshBooks();
    });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$bookList.on("click", ".delete", handleDeleteBtnClick);

// converts xml to json
// function xml2json(srcDOM) {
// 	let children = [...srcDOM.children];

// 	// base case for recursion.
// 	if (!children.length) {
// 		if (srcDOM.hasAttributes()) {
// 			var attrs = srcDOM.attributes;
// 			var output = {};
// 			for (var i = attrs.length - 1; i >= 0; i--) {
// 				output[attrs[i].name] = attrs[i].value;
// 			}
// 			output.value = srcDOM.innerHTML;
// 			return output;
// 		} else {
// 			return srcDOM.innerHTML;
// 		}
// 	}

// 	// initializing object to be returned.
// 	let jsonResult = {};
// 	for (let child of children) {
// 		// checking is child has siblings of same name.
// 		let childIsArray =
// 			children.filter(eachChild => eachChild.nodeName === child.nodeName)
// 				.length > 1;

// 		// if child is array, save the values as array, else as strings.
// 		if (childIsArray) {
// 			if (jsonResult[child.nodeName] === undefined) {
// 				jsonResult[child.nodeName] = [xml2json(child)];
// 			} else {
// 				jsonResult[child.nodeName].push(xml2json(child));
// 			}
// 		} else {
// 			jsonResult[child.nodeName] = xml2json(child);
// 		}
// 	}
// 	return jsonResult;
// }
