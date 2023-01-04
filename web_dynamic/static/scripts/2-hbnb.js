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


    $.get('http://0.0.0.0:5001/api/v1/status/', function(res) {
        if (res.status === 'OK') {
            $('DIV#api_status').addClass('available');
        } else {
            $('DIV#api_status').removeClass('available');
        }
    });
});
