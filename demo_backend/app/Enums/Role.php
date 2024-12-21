<?php


namespace App\Enums;

enum Role: string
{
    case ADMIN = 'admin';
    case BUYER = 'buyer';
    case SELLER = 'seller';

}
