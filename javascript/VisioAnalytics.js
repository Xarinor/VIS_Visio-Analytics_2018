/**
 * Visio Analytics JS Functions
 * Copyright (C) 2018, Visionaer AG
 * @author Lukas Walliser <contact@lukas-walliser.ch>
 */

(function($) {

    var nsVisioAnalytics;

    nsVisioAnalytics = {
        initVisioAnalytics: function (trackingCode = null, G4TrackingCode = null, awProperty = null, fbpCode = null) {

            let VATrackingCode = null;
            let VAG4TrackingCode = null;
            const htmlTrackingCode = $('html').html().match(/'UA-[0-9]{4,9}-[0-9]{1,4}'/);
            const htmlG4TrackingCode = $('html').html().match(/'G-[A-Z0-9]{8,12}'/);
            const htmlTagmanager = $('html').html().match(/GTM-[A-Z0-9]{2,20}/);
            trackingCode = trackingCode.match(/UA-[0-9]{4,9}-[0-9]{1,4}/);
            G4TrackingCode = G4TrackingCode.match(/G-[A-Z0-9]{8,12}/);
            let FBPixelCode = fbpCode;

            if (htmlTagmanager != null) {
                console.log('DSGVO: Tagmanager found ('+htmlTagmanager[0]+')');
            }
            if (trackingCode != null && G4TrackingCode == null) {
                console.log('DSGVO: Only Universal Analytics provided, add GA4 Property.');
            } else if (G4TrackingCode != null) {
                VAG4TrackingCode = G4TrackingCode[0] != '' ? G4TrackingCode[0] : null;
                if (htmlTrackingCode != null) {
                    console.log('DSGVO: Please remove Leftover UA-snippet ('+htmlTrackingCode[0]+')');
                }
                if (htmlG4TrackingCode != null) {
                    console.log('DSGVO: Please remove Leftover GA4-snippet ('+htmlG4TrackingCode[0]+')');
                }
            } else if (htmlG4TrackingCode != null) {
                console.log('DSGVO: Using GA4 Analytics Snippet');
                VAG4TrackingCode = htmlG4TrackingCode[0];
            } else {
                console.log('DSGVO: No Analytics found');
                if (FBPixelCode == null && awProperty == null) {
                    return;
                }
            }

            <!-- Modified Analytics Code -->
            window.google_analytics_uacct = VATrackingCode;
            window.google_analytics_domain_name = "none";

            if (this.getConsent() == 'declined') {
                if (trackingCode != null) {
                    console.log('Visio-Analytics: Analytics data link terminated');
                }
                if (FBPixelCode != null) {
                    console.log('Visio-Analytics: Facebook Pixel data link terminated');
                }
                if (awProperty != null) {
                    console.log('Visio-Analytics: Adwords data link terminated');
                }
                window['ga-disable-' + VATrackingCode] = true;
            }

            var gaJsHost = (("https:" == document.location.protocol) ? "https://www." : "http://www.");
            var gaScript = document.createElement('script');
            gaScript.src = gaJsHost + 'googletagmanager.com/gtag/js?id=';
            if (VAG4TrackingCode != null) {
                gaScript.src += VAG4TrackingCode;
            }
            document.body.appendChild(gaScript);

            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            if (VAG4TrackingCode != null) {
                console.log('Visio-Analytics: Tracking GA4 Code');
                gtag('config', VAG4TrackingCode, {
                    'anonymize_ip': true
                });
            }

            if (this.getConsent() == 'declined' && awProperty != null) {
                gtag('config', awProperty, {
                    'anonymize_ip': true,
                    'storeGac': false,
                    'store_gac': false
                });
            } else if (awProperty != null) {
                gtag('config', awProperty, {
                    'anonymize_ip': true
                });
            }
            <!-- END Modified Analytics Code -->

            <!-- Modified Facebook Pixel Code -->
            if (FBPixelCode && this.getConsent() != 'declined') {
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', FBPixelCode);
                fbq('track', 'PageView');
            }
            <!-- END Modified Facebook Pixel Code -->
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
        };

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