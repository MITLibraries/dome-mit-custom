$(function () {

    console.log('Loading featured collections...');

    // Fisher-Yates (Knuth) Shuffle implementation
    // from https://github.com/Daplie/knuth-shuffle/blob/master/index.js
    // and https://blog.codinghorror.com/the-danger-of-naivete/
    // and https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    function shuffle(array) {
        var currentIndex = array.length
          , temporaryValue
          , randomIndex
          ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
    }

    // Define function that adds featured collections
    function listFeatured( data ) {
        // data is an array of items returned from the DSpace API.
        // Sort the array (KFY probably)
        data = shuffle( data );
        // Truncate the first six elements
        selected = data.slice(0,6);
        // Display those elements
        list = document.createElement("ul");
        jQuery(list).addClass("list-group");
        jQuery.each(selected, function( index, value ) {
            jQuery(list).append('<li class="list-group-item"><span class="collection"><a href="/handle/' + value.handle + '">' + value.name + "</a></span> (" + value.numberItems + " items)<br>" + value.shortDescription + "</li>");
        });
        jQuery(featuredList).append(list);
    };

    // Create empty container
    var featuredList = document.createElement("div"),
        featuredEndpoint = "/rest/collections";
    jQuery(featuredList).addClass("featured-collections");
    jQuery("#featured_collections").append(jQuery(featuredList));

    // Retrieve list of collections and display a random selection
    jQuery.get( featuredEndpoint )
        .done(listFeatured)
        .fail(function() {
            console.error( "Error encountered loading featured collections..." );
        });
})