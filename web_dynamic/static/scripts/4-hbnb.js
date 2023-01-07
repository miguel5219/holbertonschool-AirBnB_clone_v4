$('document').ready(function () {
    const ids = [];
    let amenities = {};
    $('INPUT[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
            ids.push($(this).attr('data-id'))
            amenities[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete amenities[$(this).attr('data-id')];
            for (let i = 0; i < ids.length; i++) {
                if (ids[i] === $(this).attr('data-id')) {
                    ids.splice(i, 1)
                }
            }

        }
        $('.amenities H4').text(Object.values(amenities).join(', '));
    });
    $.get('http://localhost:5001/api/v1/status/', function(data) {
        if (data.status === 'OK') {
            $('div#api_status').addClass('available');
            console.log('todo ok')
        }
    });

    $.ajax({
        url: 'http://localhost:5001/api/v1/places_search',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: '{}',
        success: addData
    });

    $('#buttonAction').click(function () {
        $('section.places').empty();
        $.ajax({
            url: 'http://localhost:5001/api/v1/places_search',
            type: 'POST',
            data: JSON.stringify({ 'amenities': ids }),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data) {
                for (let i of data) {
                $('SECTION.places').append(
                    `<article>
                        <div class="title_box">
                        <h2>${i.name}</h2>
                        <div class="price_by_night">$${i.price_by_night}</div>
                        </div>
                        <div class="information">
                        <div class="max_guest">${i.max_guest}${i.max_guest > 1 ? ' Guests' : ' Guest'} </div>
                        <div class="number_rooms">${i.number_rooms}${i.number_rooms > 1 ? ' Bedrooms' : ' Bedroom'}</div>
                        <div class="number_bathrooms">${i.number_bathrooms}${i.number_bathrooms > 1 ? ' Bathrooms' : ' Bathroom'}</div>
                        </div>
                        <div class="user">
                        </div>
                        <div class="description">
                        ${i.description}
                        </div>
                    </article>`
                );
                }
                console.log(data)
            }
        });
    });
});


function addData (data) {
    const lengData = data.length;
    for (let i = 0; i < lengData; i++)
    {
    $('SECTION.places').append(
        `<article>
            <div class="title_box">
            <h2>${data[i].name}</h2>
            <div class="price_by_night">$${data[i].price_by_night}</div>
            </div>
            <div class="information">
            <div class="max_guest">${data[i].max_guest}${data[i].max_guest > 1 ? ' Guests' : ' Guest'} </div>
            <div class="number_rooms">${data[i].number_rooms}${data[i].number_rooms > 1 ? ' Bedrooms' : ' Bedroom'}</div>
            <div class="number_bathrooms">${data[i].number_bathrooms}${data[i].number_bathrooms > 1 ? ' Bathrooms' : ' Bathroom'}</div>
            </div>
            <div class="user">
            </div>
            <div class="description">
            ${data[i].description}
            </div>
        </article>`
    );
    }
}
