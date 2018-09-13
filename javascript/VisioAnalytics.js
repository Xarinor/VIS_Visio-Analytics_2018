/**
 * Visio Analytics JS Functions
 * Copyright (C) 2018, Visionaer AG
 * @author Lukas Walliser <contact@lukas-walliser.ch>
 */

(function($) {

    var nsVisioAnalytics;

    nsVisioAnalytics = {
        initVisioAnalytics: function (trackingCode) {

            var VATrackingCode = '';
            var htmlTrackingCode = $('html').html().match(/, ('UA-[0-9]{4,9}-[0-9]{1,4})/);
            trackingCode = trackingCode.match(/UA-[0-9]{4,9}-[0-9]{1,4}/);
            var htmlTagmanager = $('html').html().match(/GTM-[A-Z0-9]{2,20}/);

            if (htmlTagmanager != null) {
                console.log('DSGVO: Tagmanager found ('+htmlTagmanager[0]+')');
            }
            if (trackingCode != null) {
                if (htmlTrackingCode != null) {
                    console.log('DSGVO: Remove Leftover snippet ('+htmlTrackingCode[1]+')');
                }
                VATrackingCode = trackingCode;
            } else if (htmlTrackingCode != null) {
                console.log('DSGVO: Using Analytics Snippet');
                var anonymized = $('html').html().match(/'anonymize[_]?[iI]p'[,:] true/);
                if (anonymized == null) {
                    console.log('DSGVO: Missing IP Anonymization')
                }
                VATrackingCode = htmlTrackingCode[1];
            } else {
                console.log('DSGVO: No Analytics found');
                return;
            }

            window.google_analytics_uacct = VATrackingCode[0]
            window.google_analytics_domain_name = "none";

            if (this.getConsent() == 'declined') {
                console.log('Visio-Analytics: Analytics data link terminated');
                window['ga-disable-' + VATrackingCode[0]] = true;
            }

            var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
            var gaScript = document.createElement('script');
            gaScript.src = gaJsHost + "google-analytics.com/analytics.js";
            document.body.appendChild(gaScript);

            window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
            ga('create', VATrackingCode[0], 'auto');
            ga('set', 'anonymizeIp', true);
            ga('send', 'pageview');

            // Consent declined by default
            // if (document.cookie.indexOf('VisioAnalyticsConsent' + '=true') > -1) {
            //     console.log('Visio-Analytics: Consent for Analytics given - Analytics enabled');
            // } else {
            //     // Set disable cookie
            //     doument.cookie = 'Visio-AnalyticsConsent' + '=false; expires=Sat, 01 Mar 2042 13:37:00 UTC; path=/';
            // }

        },
        getCookie: function (name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) {
                return parts.pop().split(";").shift();
            } else {
                return null;
            }
        },
        setConsent: function (consent,expirationDays) {
            // Internet Explorer ie6, ie7, and ie8 do not support “max-age”, while (mostly) all browsers support expires
            // var expiryTime = $this.config.expirationDays*60*60*24;
            // document.cookie = 'VisioAnalyticsConsent' + '=' + consent + "; max-age=" + expiryTime + ";path=/";
            var d = new Date();
            d.setTime(d.getTime() + parseInt(expirationDays) * 1000 * 60 * 60 * 24); // in milliseconds
            document.cookie = 'VisioAnalyticsConsent=' + consent + '; expires=' + d.toGMTString() + ";path=/";
        },
        getConsent: function () {
            var consent = false;
            $currentConsentCookie = this.getCookie('VisioAnalyticsConsent');
            if ($currentConsentCookie != undefined) consent = $currentConsentCookie;

            return consent;
        }
    };

    window.visioAnalytics = nsVisioAnalytics;

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
            expirationDays: '14',
            backgroundColor: '',
            textColor: '',
            buttonColor: '',
            buttonTextColor: ''
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
            if (typeof customConfig.backgroundColor !== '') {
                $this.config.backgroundColor = customConfig.backgroundColor;
            }
            if (typeof customConfig.textColor !== '') {
                $this.config.textColor = customConfig.textColor;
            }
            if (typeof customConfig.buttonColor !== '') {
                $this.config.buttonColor = customConfig.buttonColor;
            }
            if (typeof customConfig.buttonTextColor !== '') {
                $this.config.buttonTextColor = customConfig.buttonTextColor;
            }
        }

        // var setConsent = function(consent) {
        //     // Internet Explorer ie6, ie7, and ie8 do not support “max-age”, while (mostly) all browsers support expires
        //     // var expiryTime = $this.config.expirationDays*60*60*24;
        //     // document.cookie = 'VisioAnalyticsConsent' + '=' + consent + "; max-age=" + expiryTime + ";path=/";
        //     var d = new Date();
        //     d.setTime(d.getTime() + $this.config.expirationDays*1000*60*60*24); // in milliseconds
        //     document.cookie = 'VisioAnalyticsConsent=' + consent + '; expires=' + d.toGMTString() + ";path=/";
        // };

        var forTemplate = function() {

            var backgroundStyle = $this.config.backgroundColor !== '' ? ' style="background-color:'+$this.config.backgroundColor+'"' : '';
            var textStyle = $this.config.textColor !== '' ? ' style="color:'+$this.config.textColor+'"' : '';
            var buttonStyle = 'style="' +
                ($this.config.buttonTextColor !== '' ? ' color:'+$this.config.buttonTextColor + ';' : '') +
                ($this.config.buttonColor !== '' ? ' background-color:'+$this.config.buttonColor + ';' : '') + '"';

            var popupHtml =
                '<div class="visio-analytics-cookie-notice ' + $this.config.position + '"' + backgroundStyle + '>' +
                '<p class="va-disclaimer"' + textStyle + '>' +
                $this.config.disclaimerText +
                ' <a class="va-more" href="' + $this.config.moreURL + '"' + ($this.config.moreNewTab ? ' target="_blank"' : '') + textStyle + '>' +
                $this.config.moreText +
                '</a>' +
                '</p>' +
                '<div class="va-actions">' +
                '<p class="va-decline a"' + textStyle + '>' +
                $this.config.declineText +
                '</p>' +
                '<p class="va-accept button"' + buttonStyle + '>'+
                $this.config.acceptText +
                '</p>' +
                '</div>' +
                '<div class="clear"></div>' +
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

                if (visioAnalytics.getConsent() != false || $this.loaded) {
                    return;
                }
                $this.loaded = true;

                $('body').append(forTemplate());

                $('.va-decline, .va-decline-consent').on('click touch', function() {
                    visioAnalytics.setConsent('declined',$this.config.expirationDays);
                    closePopup();
                });
                $('.va-accept, .va-accept-consent').on('click touch', function() {
                    visioAnalytics.setConsent('accepted',365);
                    closePopup();
                });
            }
        };
        return VisioAnalyticsCookieNoticePopup;
    });

}(jQuery));