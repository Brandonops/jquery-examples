$(document).ready(() => {
    function getJoke() {
        return $.ajax({
            url: "https://icanhazdadjoke.com/",
            headers: {
                accept: "application/json"
            }
        })
            .then(data => {
                return data.joke
            })
            .catch((error) => {
                return "There was an error, please try again"
            })
    }

    function searchJoke(term) {
        return $.ajax({
            url: 'https://icanhazdadjoke.com/search?term=' + term,
            headers: {
                'Accept': 'application/json'        
            }
        }).then(res => {
            return res.results.map(result => result.joke)
        }).catch(err => {
            console.log(err);
            return 'There was an error making the reqeuest';
        });
    }

    const $container = $("<div>");
    const $h1 = $("<h1>", { text: "Dad Jokes" })

    $(document.body).append($container)
    $container.append($h1);
    $h1.on("click", () => {
        $h1.toggleClass("active");
    })

    const $jokeButton = $("<button>Click for a lolz</button>");
    $container.append($jokeButton);
    $jokeButton.on("click", () => {
        console.log("clicked");
        $(".joke").remove();
        getJoke().then((joke) => {
            $("<p>", {
                text: joke,
                class: "joke"
            })
            .hide()
            .appendTo($container)
            .fadeIn()
            })
    });

    const $jokeForm = $("<form id='jokeForm'></form>")
    const $jokeInput = $("<input>", {
        placeholder: "Enter search term"
    });
    const $submitbtn = $("<button type='submit'>Search</button>");

    $jokeForm
    .append($jokeInput)
    .append($submitbtn)
    .appendTo(document.body)
    .on("submit", (event) => {
        event.preventDefault();
        const searchTerm = $jokeInput.val();
        searchJoke(searchTerm)
        .then((jokesArray) => {
            console.log(jokesArray)
            $(jokesArray).each((index, joke) => {
                $("<p>", {
                    text: joke,
                    class: "joke"
                })
                .hide()
                .appendTo($container)
                .fadeIn()
        
            })
        })
    
    })
});