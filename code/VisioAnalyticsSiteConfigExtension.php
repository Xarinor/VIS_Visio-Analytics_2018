<?php

/**
 * Visio Analytics Settings Overwrite
 * Copyright (C) 2018, Visionaer AG
 * @author Lukas Walliser <contact@lukas-walliser.ch>
 */
class VisioAnalyticsSiteConfigExtension extends DataExtension {

    private static $db = array(
        'VATrackingCode' => 'Varchar(255)',
        'VADisablePopup' => 'Boolean',
        'VADisclaimerText' => 'HTMLText',
        'VAAcceptText' => 'Text',
        'VADeclineText' => 'Text',
        'VABackgroundColor' => 'Varchar(7)',
        'VATextColor' => 'Varchar(7)',
        'VAButtonColor' => 'Varchar(7)',
        'VAButtonTextColor' => 'Varchar(7)',
        'VAMoreText' => 'Text',
        'VAMoreURL' => 'Varchar(255)',
        'VAMoreNewTab' => 'Boolean',
        'VAPosition' => 'Text',
        'VAExpirationDays' => 'Int'
    );

    public function updateCMSFields(FieldList $fields) {

        $fields->addFieldToTab('Root.VisioAnalytics', FieldGroup::create(
            TextField::create('VATrackingCode', _t('VisioAnalytics.TRACKINGCODE', 'Tracking code')),
            NumericField::create('VAExpirationDays', _t('VisioAnalytics.EXPIRATIONDAYS', 'Cookie Expiration in days'))
        ));
        $fields->addFieldToTab('Root.VisioAnalytics', FieldGroup::create(
            CheckboxField::create('VADisablePopup', _t('VisioAnalytics.DISABLEPOPUP', 'Disable Cookie Popup')),
            DropdownField::create('VAPosition', _t('VisioAnalytics.POSITION', 'Cookie Position'), array(
                'bottom' => _t('VisioAnalytics.POSBOTTOM', 'bottom wide'),
                'bottomleft' => _t('VisioAnalytics.POSBOTTOMLEFT', 'bottom left'),
                'bottomright' => _t('VisioAnalytics.POSBOTTOMRIGHT', 'bottom right'),
                'topleft' => _t('VisioAnalytics.POSTOPLEFT', 'top left'),
                'topright' => _t('VisioAnalytics.POSTOPRIGHT', 'top right')
            ))
        ));
        $fields->addFieldToTab('Root.VisioAnalytics', TextareaField::create('VADisclaimerText', _t('VisioAnalytics.DISCLAIMERTEXT', 'Disclaimer Text')));
        $fields->addFieldToTab('Root.VisioAnalytics', FieldGroup::create(
            CheckboxField::create('VAMoreNewTab', _t('VisioAnalytics.MORENEWTAB', 'Open link in new window')),
            TextField::create('VAMoreText', _t('VisioAnalytics.MORETEXT', 'More Text')),
            TextField::create('VAMoreURL', _t('VisioAnalytics.MOREURL', 'More URL'))
        ));
        $fields->addFieldToTab('Root.VisioAnalytics', FieldGroup::create(
            TextField::create('VAAcceptText', _t('VisioAnalytics.ACCEPTTEXT', 'Accept Text')),
            TextField::create('VADeclineText', _t('VisioAnalytics.DECLINETEXT', 'Decline Text'))
        ));
        $fields->addFieldToTab('Root.VisioAnalytics', FieldGroup::create(
            TextField::create('VABackgroundColor', _t('VisioAnalytics.BGCOLOR', 'Backround Color')),
            TextField::create('VATextColor', _t('VisioAnalytics.TXTCOLOR', 'Text Color')),
            TextField::create('VAButtonColor', _t('VisioAnalytics.BTNCOLOR', 'Button Color')),
            TextField::create('VAButtonTextColor', _t('VisioAnalytics.BTNTXTCOLOR', 'Button Color'))
        ));
    }
}