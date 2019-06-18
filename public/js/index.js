$(document).ready(function() {
    // Get references to page elements
    var $bookTitle = $("#book-title");
    var $book = $("#myModal");
    var $bookDescription = $("#book-description");
    var $submitBtn = $("#submit");
    var $bookList = $("#book-list");

    var resultsList = [];
    var index;
    var dataid;

    $(".loader").hide();

    // The API object contains methods for each kind of request we'll make
    var API = {
        saveBook: function(book) {
            // move goodreads api call here
            return $.ajax({
                url: "/api/books",
                type: "POST",
                data: book
            });
        },
        getBooks: function() {
            return $.ajax({
                url: "/api/books",
                type: "GET"
            });
        },
        getABook: function(id) {
            return $.get("/api/books/" + id);
            // return $.ajax({
            //     url: "/api/books/" + id,
            //     type: "GET"
            // });
        },
        updateBook: function(book) {
            return $.ajax({
                url: "/api/books",
                type: "PUT",
                data: book
            });
        },
        deleteBook: function(id) {
            return $.ajax({
                url: "/api/books/" + id,
                type: "DELETE"
            });
        }
    };

    // refreshBooks gets new books from the db and repopulates the list
    var refreshBooks = function() {
        API.getBooks().then(function(data) {
            console.log(data);
            $(".books").empty();
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
					"<li class='bookShelfList'><a return false'><button data-toggle='modal' type='button' data-target='#exampleModalCenter' class='h1 animated fadeIn' data-id=" +
					data[i].id +
					">" +
					img +
					"</button></a></li>";
                $(".books")
                    .append(button)
                    .children(":last")
                    .hide()
                    .delay(i * 100)
                    .fadeIn(100);
                console.log(data[i].read);

                if (data[i].read === true) {
                    $(".h1[data-id=" + dataid + "]").addClass("read");
                }
            }
        });
    };
    refreshBooks();

    var appendBook = function() {
        API.getBooks().then(function(result) {
            var j = result.length;
            var img =
				"<img class='bookCover' src='" + result[j - 1].cover + "'>";
            var button =
				"<li class='bookShelfList'><a return false'><button data-toggle='modal' type='button' data-target='#exampleModalCenter' class='h1 animated fadeIn' data-id=" +
				result[j - 1].id +
				">" +
				img +
				"</button></a></li>";
            $(".books")
                .append(button)
                .children(":last")
                .hide()
                .delay(j * 100)
                .fadeIn(100);
        });
    };
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
                title: dataInfo.title,
                author: [dataInfo.authors].join(","),
                date: dataInfo.publishedDate
                    ? dataInfo.publishedDate
                    : "Not available",
                plot: dataInfo.description
                    ? dataInfo.description
                    : "Not available",
                avg_rating: dataInfo.averageRating,
                genre: [dataInfo.categories].join(", "),
                cover: dataInfo.imageLinks
                    ? dataInfo.imageLinks.thumbnail
                    : "https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif"
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
    $(document).on("click", ".h", function() {
        $(".deleteBook").hide();
        index = $(this).attr("data-index");
        $(".modal-title").text(resultsList[index].title);
        $(".modal-author").text("Author(s): " + resultsList[index].author);
        $(".modal-body").text(resultsList[index].plot);
        $(".modal-genre").text("Genre: " + resultsList[index].genre);
        $(".modal-date").text("Published Date: " + resultsList[index].date);
        $("#markRead").attr("id", "addBook");
        $("#addBook").text("Add to Bookshelf");
    });

    $(document).on("click", ".h1", function() {
        dataid = $(this).attr("data-id");
        console.log(dataid);

        API.getABook(dataid).then(function(result) {
            console.log(result);
            $(".modal-title").text(result.title);
            $(".modal-author").text("Author(s): " + result.author);
            $(".modal-body").text(result.plot);
            $(".modal-genre").text("Genre: " + result.genre);
            $(".modal-date").text("Published Date: " + result.date);
        });
        $(".deleteBook").show();
        $("#addBook").attr("id", "markRead");
        $("#markRead").text("Mark as read");
    });

    $(".addBook").on("click", function() {
        var id = $(this).attr("id");

        if (id === "addBook") {
            API.saveBook(resultsList[index]).then(function() {
                appendBook();
            });
        } else if (id === "markRead") {
            console.log("Marking as read");
            API.getBooks().then(function(result) {
                console.log(result[dataid - 1]);
                var updatedBook = {
                    id: dataid,
                    read: 1
                };
                API.updateBook(updatedBook).then(function() {
                    $(".h1[data-id=" + dataid + "]").addClass("read");
                });
            });
        }
    });

    $(".deleteBook").on("click", function() {
        API.deleteBook(dataid).then(function() {
            $("li.bookShelfList > a > .h1[data-id=" + dataid + "]")
                .fadeOut()
                .remove();
            refreshBooks();
        });
    });

    // onclick for bookshelf modal; replace class and text from 'save to bookshelf' to 'finished reading'; same thing for delete button

    // Add event listeners to the submit and delete buttons
    $submitBtn.on("click", handleFormSubmit);
    $bookList.on("click", ".delete", handleDeleteBtnClick);
});
