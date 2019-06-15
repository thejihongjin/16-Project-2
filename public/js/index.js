// Get references to page elements
var $bookTitle = $("#book-title");
var $book = $("#myModal");
var $bookDescription = $("#book-description");
var $submitBtn = $("#submit");
var $bookList = $("#book-list");

var resultsList = [];
var index;

$(".loader").hide();

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

    $("#searchResultList").empty();

    // show loader

    var bookTitle = encodeURIComponent($bookTitle.val().trim());
    console.log(bookTitle);

    if (!bookTitle) {
        alert("You must enter an book title!");
        return;
    } else {
        $(".loader").fadeIn("fast", function() {
            console.log("Loading");
        });
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
        //console.log(response);
        // loader hide
        $(".loader").fadeOut(10, function() {
            console.log("Loaded");
        });

        console.log(queryUrl);
        appendSearchResults(response.items);
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

var appendSearchResults = function(data) {
    //console.log(data);
    for (var i = 0; i < data.length; i++) {
        var dataInfo = data[i].volumeInfo;
        //console.log(dataInfo);
        var info = {
            id: i,
            title: dataInfo.title,
            author: dataInfo.authors.join(", "),
            year: dataInfo.publishedDate,
            plot: dataInfo.description,
            avg_rating: dataInfo.averageRating,
            cover: dataInfo.imageLinks.thumbnail
        };
        resultsList.push(info);
    }

    for (var i = 0; i <= resultsList.length; i++) {
        var img = "<img src='" + resultsList[i].cover + "'>";
        var list =
			"<li><button data-toggle='modal' type='button' data-target='#exampleModalCenter' class='h' data-index=" +
			i +
			">" +
			img +
			"</button></li>";
        $("#searchResultList")
            .append(list)
            .children(":last")
            .hide()
            .fadeIn(100 + i * 250);
        console.log(resultsList);
    }
};
$("#searchResultList").on("click", ".h", function() {
    console.log("test");
    index = $(this).attr("data-index");
    $(".modal-title").text(resultsList[index].title);
    $(".modal-body").text(resultsList[index].plot);
});

$("#addBook").on("click", function() {
    console.log(index);
    API.saveBook(resultsList[index]);
});

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$bookList.on("click", ".delete", handleDeleteBtnClick);
