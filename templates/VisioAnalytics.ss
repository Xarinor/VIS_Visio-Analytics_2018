<%-- Visio Cookie START --%>

$(window).ready(function(){
    $(document).VisioAnalyticsTracking($TrackingCode);
});

<%--window.google_analytics_uacct = "UA-117525463-1"--%>
<%--window.google_analytics_domain_name = "none";--%>

<%--if (document.cookie.indexOf('VisioCookieConsent' + '=false')) {--%>
    <%--console.log('VisioCookie: Analytics loading prevented');--%>
    <%--window['ga-disable-'+window.google_analytics_uacct] = true;--%>
<%--}--%>


<%--var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");--%>
<%--var gaScript = document.createElement('script');--%>
<%--var loaded = false;--%>
<%--gaScript.src = gaJsHost + "google-analytics.com/ga.js";--%>

<%--$(gaScript).load(function(){--%>
    <%--loaded = true;--%>
    <%--var pageTracker = _gat._getTracker(window.google_analytics_uacct);--%>
    <%--_gat._anonymizeIp();--%>
    <%--pageTracker._initData();--%>
    <%--pageTracker._trackPageview();--%>
<%--});--%>

<%--document.body.appendChild(gaScript);--%>

<%--// IE 7-8 Support--%>
<%--gaInterval = setInterval(function() {--%>
    <%--if (!loaded && typeof _gat != 'undefined') {--%>
        <%--$(gaScript).load();--%>
        <%--clearInterval(gaInterval);--%>
    <%--}--%>
<%--},50);--%>

<%--FIXED--%>
<%--jQuery(window).on('load', function($){--%>
<%--var gaProperty = $('html').html().match(/UA-[0-9]{4,9}-[0-9]{1,4}/);--%>

$(window).load(function(){

    <%--$(document).VisioAnalytics--%>


    <%--// Find Analytics TrackingID in source--%>
    <%--var gaProperty = $('body').html().match(/UA-[0-9]{4,9}-[0-9]{1,4}/);--%>
    <%--if (gaProperty) {--%>

        <%--console.log('VisioCookie: Analytics implementation found - loading VisioCookie');--%>
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
        <%--var gaID = gaProperty[0];--%>
        <%--var disableAnalytics = 'ga-disable-' + gaID;--%>
        <%--// Prevent Analytics from helping when cookie is set--%>
        <%--if (document.cookie.indexOf('VisioCookieConsent' + '=true') > -1) {--%>
            <%--console.log('VisioCookie: Consent for Analytics given - Analytics enabled');--%>
        <%--} else {--%>
            <%--// Set disable cookie--%>
            <%--document.cookie = 'VisioCookieConsent' + '=false; expires=Sat, 01 Mar 2042 13:37:00 UTC; path=/';--%>
        <%--}--%>
        <%--$(document).bind('user_cookie_consent_changed', function(event, object) {--%>
            <%--if ($(object).attr('consent') == true) {--%>
                <%--document.cookie = 'VisioCookieConsent' + '=true; expires=Sat, 01 Mar 2042 13:37:00 UTC; path=/';--%>
            <%--}--%>
        <%--});--%>
    <%--} else {--%>
        <%--console.log('VisioCookie: No Analytics implementation found');--%>
    <%--}--%>
});
<%-- Visio Cookie END --%>