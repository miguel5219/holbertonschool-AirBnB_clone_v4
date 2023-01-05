$(function () {
    function ToArray (amenities) {
        $('.amenities H4').text(Object.values(amenities).join(', '));
    }

    const allAmenities = {};
    $('.amenities input').on('change', function () {
        if ($(this).is(':checked')) {
            allAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete allAmenities[$(this).attr('data-id')];
        }
        ToArray(allAmenities);
    });
    $.get('http://localhost:5001/api/v1/status/', function(data) {
        if (data.status === 'OK') {
            $('div#api_status').addClass('available');
            console.log('todo ok')
        }
    });

    $.ajax({
        url: 'http://localhost:5001/api/v1/places_search/',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({}),
        success: function (data) {
            data.forEach(d => $('.places').append(addPlace(d)));
        }
    });

    function addPlace (place) {
        return `
        <article>
        <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}
            </div>
            </div>
            <div class="information">
            <div class="max_guest">
            ${place.max_guest} Guest
            </div>
            <div class="number_rooms">${place.number_rooms} Bedroom
            </div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom
            </div>
            </div>
            <div class="description">${place.description}
            </div>
            </article>
        `;
    }

    $('button').click(() => {
        $('.places').empty();
        $.ajax({
            url: 'http://localhost:5001/api/v1/places_search/',
            method: 'POST',
            data: JSON.stringify({ amenities: Object.keys(amenityIds) }),
            contentType: 'application/json',
            success: function (data) {
                data.forEach(d => $('.places').append(addPlace(d)));
            }
        });

        function addPlace (place) {
            return `
            <article>
            <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}
                </div>
                </div>
                <div class="information">
                <div class="max_guest">
                ${place.max_guest} Guest
                </div>
                <div class="number_rooms">${place.number_rooms} Bedroom
                </div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom
                </div>
                </div>
                <div class="description">${place.description}
                </div>
                </article>
            `;
        }
    
    });
});
