/**
 * Visio Analytics Custom JS Template
 * Copyright (C) 2018, Visionaer AG
 * @author Lukas Walliser <contact@lukas-walliser.ch>
 */

(function($) {

$(window).on('load', function(){

    visioAnalytics.initVisioAnalytics('$TrackingCode');

    if (visioAnalytics.getConsent() == false && $DisablePopup != 1) {
        $(document).VisioAnalyticsCookieNotice().init({
            disclaimerText: "$DisclaimerText",
            acceptText: "$AcceptText",
            declineText: "$DeclineText",
            moreText: "$MoreText",
            moreURL: "$MoreURL",
            moreNewTab: $MoreNewTab,
            position: "$Position",
            expirationDays: '$ExpirationDays'
        });
    }

    $('.va-decline-consent').on('click touch', function(e) {
        e.preventDefault();
        visioAnalytics.setConsent('declined','$ExpirationDays');
    });

    $('.va-accept-consent').on('click touch', function(e) {
        e.preventDefault();
        visioAnalytics.setConsent('accepted',365);
    });
});

}(jQuery));