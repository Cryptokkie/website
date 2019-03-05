import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

const CURRENCIES_DUMMY = [
  {
    icon: 'https://res.cloudinary.com/coinexplorer/image/upload/v0/DASH/logo_35.png',
    name: 'Dash', ticker: 'DASH', price: 76.9519, change: -1.67, volume: 721646157, circulating: 8640246, marketcap: 664883686
  },
  {
    icon: 'https://res.cloudinary.com/coinexplorer/image/upload/v0/DASH/logo_35.png',
    name: 'Dash', ticker: 'DASH', price: 76.9519, change: -1.67, volume: 721646157, circulating: 8640246, marketcap: 664883686
  },
  {
    icon: 'https://res.cloudinary.com/coinexplorer/image/upload/v0/DASH/logo_35.png',
    name: 'Dash', ticker: 'DASH', price: 76.9519, change: -1.67, volume: 721646157, circulating: 8640246, marketcap: 664883686
  },
  {
    icon: 'https://res.cloudinary.com/coinexplorer/image/upload/v0/DASH/logo_35.png',
    name: 'Dash', ticker: 'DASH', price: 76.9519, change: -1.67, volume: 721646157, circulating: 8640246, marketcap: 664883686
  },
  {
    icon: 'https://res.cloudinary.com/coinexplorer/image/upload/v0/DASH/logo_35.png',
    name: 'Dash', ticker: 'DASH', price: 76.9519, change: -1.67, volume: 721646157, circulating: 8640246, marketcap: 664883686
  },
  {
    icon: 'https://res.cloudinary.com/coinexplorer/image/upload/v0/DASH/logo_35.png',
    name: 'Dash', ticker: 'DASH', price: 76.9519, change: -1.67, volume: 721646157, circulating: 8640246, marketcap: 664883686
  },
  {
    icon: 'https://res.cloudinary.com/coinexplorer/image/upload/v0/DASH/logo_35.png',
    name: 'Dash', ticker: 'DASH', price: 76.9519, change: -1.67, volume: 721646157, circulating: 8640246, marketcap: 664883686
  },
  {
    icon: 'https://res.cloudinary.com/coinexplorer/image/upload/v0/DASH/logo_35.png',
    name: 'Dash', ticker: 'DASH', price: 76.9519, change: -1.67, volume: 721646157, circulating: 8640246, marketcap: 664883686
  },
  {
    icon: 'https://res.cloudinary.com/coinexplorer/image/upload/v0/DASH/logo_35.png',
    name: 'Dash', ticker: 'DASH', price: 76.9519, change: -1.67, volume: 721646157, circulating: 8640246, marketcap: 664883686
  },
  {
    icon: 'https://res.cloudinary.com/coinexplorer/image/upload/v0/DASH/logo_35.png',
    name: 'Dash', ticker: 'DASH', price: 76.9519, change: -1.67, volume: 721646157, circulating: 8640246, marketcap: 664883686
  },
  {
    icon: 'https://res.cloudinary.com/coinexplorer/image/upload/v0/DASH/logo_35.png',
    name: 'Dash', ticker: 'DASH', price: 76.9519, change: -1.67, volume: 721646157, circulating: 8640246, marketcap: 664883686
  },
  {
    icon: 'https://res.cloudinary.com/coinexplorer/image/upload/v0/DASH/logo_35.png',
    name: 'Dash', ticker: 'DASH', price: 76.9519, change: -1.67, volume: 721646157, circulating: 8640246, marketcap: 664883686
  }
];

@Component({
  selector: 'app-currencies-overview',
  templateUrl: './currencies-overview.component.html',
  styleUrls: ['./currencies-overview.component.scss']
})
export class CurrenciesOverviewComponent implements OnInit {

  displayedColumns: string[] = ['name', 'price', 'change', 'volume', 'circulating', 'marketcap'];
  currencies = new MatTableDataSource(CURRENCIES_DUMMY);

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.currencies.sort = this.sort;
  }

}
