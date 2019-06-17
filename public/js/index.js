$(document).ready(function() {
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

            return $.post("/api/books", book);
        },
        getBooks: function(book) {
            return $.get("/api/books", book);
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
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var bookCover = function() {
                    if (data[i].cover === undefined) {
                        return "https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif";
                    } else {
                        return data[i].cover;
                    }
                };
                var img = "<img class='bookCover' src='" + bookCover() + "'>";
                var button =
					"<li><a return false'><button data-toggle='modal' type='button' data-target='#exampleModalCenter' class='h animated fadeIn' data-index=" +
					i +
					">" +
					img +
					"</button></a></li>";
                $(".books").append(button);
            }
        });
    };
    refreshBooks();
    // handleFormSubmit is called whenever we submit a new book
    // Save the new book to the db and refresh the list
    var handleFormSubmit = function(event) {
        event.preventDefault();

        resultsList.length = 0;
        $("#searchResultList").empty();

        // show loader

        var bookTitle = encodeURIComponent($bookTitle.val().trim());

        if (!bookTitle) {
            alert("You must enter an book title!");
            return;
        } else {
            $(".loader").fadeIn("fast", function() {
                console.log("Loading");
            });
        }

        var queryUrl =
			"https://www.googleapis.com/books/v1/volumes?q={" + bookTitle + "}";
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {
            $(".loader").fadeOut(10, function() {
                console.log("Loaded");
            });

            // console.log(queryUrl);
            appendSearchResults(response.items);
        });

        $bookTitle.val("");
    };

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
        console.log(data);
        // $.each(data, function(i, item) {
        //     // var dataInfo = data[i].volumeInfo;
        //     var info = {
        //         id: i,
        //         title: item.volumeInfo.title,
        //         author: [item.volumeInfo.authors].join(", "),
        //         date: item.volumeInfo.publishedDate,
        //         plot: item.volumeInfo.description,
        //         avg_rating: item.volumeInfo.averageRating,
        //         genre: [item.volumeInfo.categories].join(", "),
        //         cover: book.volumeInfo.imageLinks
        //             ? book.volumeInfo.imageLinks.thumbnail
        //             : undefined
        //     };
        //     console.log(info);
        //     resultsList.push(info);
        // });
        console.log(resultsList);
        for (var i = 0; i < data.length; i++) {
            var dataInfo = data[i].volumeInfo;
            var info = {
                id: i,
                title: dataInfo.title,
                author: [dataInfo.authors].join(", "),
                date: dataInfo.publishedDate,
                plot: dataInfo.description,
                avg_rating: dataInfo.averageRating,
                genre: [dataInfo.categories].join(", "),
                cover: dataInfo.imageLinks
                    ? dataInfo.imageLinks.thumbnail
                    : undefined
            };
            console.log(info);
            resultsList.push(info);
        }
        for (var i = 0; i <= resultsList.length; i++) {
            var bookCover = function() {
                if (resultsList[i].cover === undefined) {
                    return "https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif";
                } else {
                    return resultsList[i].cover;
                }
            };
            var img = "<img class='bookCover' src='" + bookCover() + "'>";
            var button =
				"<li><a return false'><button data-toggle='modal' type='button' data-target='#exampleModalCenter' class='h animated fadeIn' data-index=" +
				i +
				">" +
				img +
				"</button></a></li>";

            $("#searchResultList")
                .append(button)
                .children(":last")
                .hide()
                .delay(i * 100)
                .fadeIn(100);
            console.log(resultsList);
        }
    };
    $("#searchResultList").on("click", ".h", function() {
        index = $(this).attr("data-index");
        $(".modal-title").text(resultsList[index].title);
        $(".modal-author").text("Author(s): " + resultsList[index].author);
        $(".modal-body").text(resultsList[index].plot);
        $(".modal-genre").text("Genre: " + resultsList[index].genre);
        $(".modal-date").text("Published Date: " + resultsList[index].date);
    });

    $("#addBook").on("click", function() {
        console.log(index);
        API.saveBook(resultsList[index]).then(function() {
            refreshBooks();
        });
    });

    // onclick for bookshelf modal; replace class and text from 'save to bookshelf' to 'finished reading'; same thing for delete button

    // Add event listeners to the submit and delete buttons
    $submitBtn.on("click", handleFormSubmit);
    $bookList.on("click", ".delete", handleDeleteBtnClick);
});
