<?php

/**
 * Visio Analytics Settings Overwrite
 * Copyright (C) 2018, Visionaer AG
 * @author Lukas Walliser <contact@lukas-walliser.ch>
 */
class VisioAnalyticsSiteConfigExtension extends DataExtension {

    private static $db = array(
        'VATrackingCode' => 'Varchar(255)',
        'VADisclaimerText' => 'HTMLText',
        'VAAcceptText' => 'Text',
        'VADeclineText' => 'Text',
        'VAMoreText' => 'Text',
        'VAMoreURL' => 'Varchar(255)',
        'VAMoreNewTab' => 'Boolean',
        'VAPosition' => 'Text',
        'VAExpirationDays' => 'Int'
    );

    public function updateCMSFields(FieldList $fields) {
        $fields->addFieldToTab("Root.VisioAnalytics", TextField::create('VATrackingCode', _t('VisioAnalytics.TRACKINGCODE', 'Tracking code')));
        $fields->addFieldToTab("Root.VisioAnalytics", TextField::create('VADisclaimerText', _t('VisioAnalytics.DISCLAIMERTEXT', 'Disclaimer Text')));
        $fields->addFieldToTab("Root.VisioAnalytics", TextField::create('VAAcceptText', _t('VisioAnalytics.ACCEPTTEXT', 'Accept Text')));
        $fields->addFieldToTab("Root.VisioAnalytics", TextField::create('VADeclineText', _t('VisioAnalytics.DECLINETEXT', 'Decline Text')));
        $fields->addFieldToTab("Root.VisioAnalytics", TextField::create('VAMoreText', _t('VisioAnalytics.MORETEXT', 'More Text')));
        $fields->addFieldToTab("Root.VisioAnalytics", TextField::create('VAMoreURL', _t('VisioAnalytics.MOREURL', 'More URL')));
        $fields->addFieldToTab("Root.VisioAnalytics", TextField::create('VAMoreNewTab', _t('VisioAnalytics.MORENEWTAB', 'Open link in new window')));
        $fields->addFieldToTab("Root.VisioAnalytics", DropdownField::create('VAPosition', _t('VisioAnalytics.POSITION', 'Cookie Position'), array(
            'bottom' => _t('VisioAnalytics.POSBOTTOM', 'bottom wide'),
            'bottomleft' => _t('VisioAnalytics.POSBOTTOMLEFT', 'bottom left'),
            'bottomright' => _t('VisioAnalytics.POSBOTTOMRIGHT', 'bottom right'),
            'top' => _t('VisioAnalytics.POSTOP', 'top wide'),
            'topleft' => _t('VisioAnalytics.POSTOPLEFT', 'top left'),
            'topright' => _t('VisioAnalytics.POSTOPRIGHT', 'top right')
        )));
        $fields->addFieldToTab("Root.VisioAnalytics", NumericField::create('VAExpirationDays', _t('VisioAnalytics.EXPIRATIONDAYS', 'Cookie Expiration in days')));
    }
}