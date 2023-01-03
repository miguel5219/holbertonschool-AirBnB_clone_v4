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
});