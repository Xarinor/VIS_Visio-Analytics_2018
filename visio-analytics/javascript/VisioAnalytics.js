/**
 * Visio Analytics JS Functions
 * Copyright (C) 2018, Visionaer AG
 * @author Lukas Walliser <contact@lukas-walliser.ch>
 */

(function($) {

$.VisioAnalyticsTracking = (function(UA) {

    if (UA != null) {

    }

    window.google_analytics_uacct = UA
    window.google_analytics_domain_name = "none";

    if (getConsent() == 'declined') {
        console.log('VisioCookie: Analytics loading prevented');
        window['ga-disable-'+window.google_analytics_uacct] = true;
    }
});



$.prototype.VisioAnalyticsCookieNotice = (function() {

    var $this = this;

    $this.config = {
        disclaimerText: 'We use cookies to improve our website. Do you agree to google analytics usage?',
        acceptText: 'Continue',
        declineText: 'Prevent cookies',
        moreText: 'Read more',
        moreURL: 'https://www.visionaer.swiss/cookie-policy',
        moreNewTab: true,
        position: 'bottomleft',
        expirationDays: '14'
    };
    $this.loaded = false;

    var overwriteConfig = function(customConfig) {
        if (typeof customConfig.disclaimerText !== 'undefined') {
            $this.config.disclaimerText = customConfig.disclaimerText;
        }
        if (typeof customConfig.acceptText !== 'undefined') {
            $this.config.acceptText = customConfig.acceptText;
        }
        if (typeof customConfig.declineText !== 'undefined') {
            $this.config.declineText = customConfig.declineText;
        }
        if (typeof customConfig.moreText !== 'undefined') {
            $this.config.moreText = customConfig.moreText;
        }
        if (typeof customConfig.moreURL !== 'undefined') {
            $this.config.moreURL = customConfig.moreURL;
        }
        if (typeof customConfig.moreNewTab !== 'undefined') {
            $this.config.moreNewTab = customConfig.moreNewTab;
        }
        if (typeof customConfig.position !== 'undefined') {
            $this.config.position = customConfig.position;
        }
        if (typeof customConfig.expirationDays !== 'undefined') {
            $this.config.expirationDays = customConfig.expirationDays;
        }
        console.log('overwriteConfig:'+customConfig);
    }

    var setConsent = function(consent) {
        // Internet Explorer ie6, ie7, and ie8 do not support “max-age”, while (mostly) all browsers support expires
        // var expiryTime = $this.config.expirationDays*60*60*24;
        // document.cookie = 'VisioAnalyticsConsent' + '=' + consent + "; max-age=" + expiryTime + ";path=/";
        var d = new Date();
        d.setTime(d.getTime() + $this.config.expirationDays*1000*60*60*24); // in milliseconds
        document.cookie = 'VisioAnalyticsConsent=' + consent + '; expires=' + d.toGMTString() + ";path=/";
    };

    var forTemplate = function() {

        var popupHtml =
            '<div class="visio-analytics-cookie-notice" ' + $this.config.position + '>' +
                '<p class="va-disclaimer">' +
                    $this.config.disclaimerText +
                    '<a class="va-more" href="' + $this.config.moreURL + '"' + ($this.config.moreNewTab ? ' target="_blank"' : '')+ '>' +
                        $this.config.moreText +
                    '</a>' +
                '</p>' +
                '<div class="va-actions">' +
                    '<p class="va-decline">' +
                        $this.config.declineText +
                    '</p>' +
                    '<p class="va-accept button">'+
                        $this.config.acceptText +
                    '</p>' +
                    '<div class="clear"></div>' +
                '</div>' +
            '</div>';

        return popupHtml;
    };

    var closePopup = function() {
        var $popup = $('.visio-analytics-cookie-notice');
        $popup.animate({height: 0, opacity: 0}, 150, function() {
            $popup.hide();
        });
    };

    var VisioAnalyticsCookieNoticePopup = {

        init : function(config) {

            overwriteConfig(config);

            if (getConsent() != false || $this.loaded) {
                return;
            }
            $this.loaded = true;

            $('body').append(forTemplate());

            $('.va-decline').click(function() {
                setConsent('declined');
                closePopup();
                console.log('decline click');
            });
            $('.va-accept').click(function() {
                setConsent('accepted');
                closePopup();
                console.log('accept click');
                console.log('accept click');
            });
        }
    };

    return VisioAnalyticsCookieNoticePopup;
});

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function getConsent() {

    var consent = false;
    $currentConsentCookie = getCookie('VisioAnalyticsConsent');

    if ($currentConsentCookie != undefined) consent = $currentConsentCookie;

    return consent;
};

}(jQuery));