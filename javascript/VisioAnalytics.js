/**
 * Visio Analytics JS Functions
 * Copyright (C) 2018, Visionaer AG
 * @author Lukas Walliser <contact@lukas-walliser.ch>
 */

(function($) {

jQuery(window).on('load', function($){

    var VATrackingCode = '$VATrackingCode';

    if (VATrackingCode === '') {
        VATrackingCode = $('html').html().match(/UA-[0-9]{4,9}-[0-9]{1,4}/);
    }

    if (VATrackingCode != '') {
        console.log(VATrackingCode);

        window.google_analytics_uacct = VATrackingCode
        window.google_analytics_domain_name = "none";

        if (document.cookie.indexOf('VisioCookieConsent' + '=false')) {
            console.log('VisioCookie: Analytics loading prevented');
            window['ga-disable-' + window.google_analytics_uacct] = true;
        }

        var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
        var gaScript = document.createElement('script');
        var loaded = false;
        gaScript.src = gaJsHost + "google-analytics.com/ga.js";

        $(gaScript).load(function () {
            loaded = true;
            var pageTracker = _gat._getTracker(window.google_analytics_uacct);
            _gat._anonymizeIp();
            pageTracker._initData();
            pageTracker._trackPageview();
        });
        document.body.appendChild(gaScript);

        // IE 7-8 Support
        gaInterval = setInterval(function() {
            if (!loaded && typeof _gat != 'undefined') {
                $(gaScript).load();
                clearInterval(gaInterval);
            }
        },50);

        console.log('VisioCookie: Analytics implementation found - loading VisioCookie');

        $(document).VisioAnalyticsCookieNotice().init({
            disclaimerText: "$DisclaimerText",
            acceptText: "$AcceptText",
            declineText: "$DeclineText",
            moreText: "$MoreText",
            moreURL: "$MoreURL",
            moreNewTab: $MoreNewTab,
            position: "$Position",
            expirationDays: $ExpirationDays
        });

        // Consent declined by default
        // if (document.cookie.indexOf('VisioCookieConsent' + '=true') > -1) {
        //     console.log('VisioCookie: Consent for Analytics given - Analytics enabled');
        // } else {
        //     // Set disable cookie
        //     document.cookie = 'VisioCookieConsent' + '=false; expires=Sat, 01 Mar 2042 13:37:00 UTC; path=/';
        // }
        // $(document).bind('user_cookie_consent_changed', function(event, object) {
        //     if ($(object).attr('consent') == true) {
        //         document.cookie = 'VisioCookieConsent' + '=true; expires=Sat, 01 Mar 2042 13:37:00 UTC; path=/';
        //     }
        // });

        $(document).bind('user_cookie_consent_changed', function(event, object) {
            if ($(object).attr('consent') == true) {
                document.cookie = 'VisioCookieConsent' + '=true; expires=Sat, 01 Mar 2042 13:37:00 UTC; path=/';
            }
        });

    } else {
        console.log('VisioCookie: No Analytics implementation found');
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