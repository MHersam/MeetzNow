using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace VSTOPrototyp.UI.UserControls
{
    /// <summary>
    /// Interaktionslogik für TabContoller.xaml
    /// </summary>
    public partial class TabContoller : UserControl
    {
        private int activeTab = 0;
        private Tab_Übersicht übersicht;
        private Tab_Erstellen erstellen;

        public TabContoller()
        {
            InitializeComponent();
        }

        private void Erstellen_Click(object sender, RoutedEventArgs e)
        {
            if (activeTab != 2)
            {
                activeTab = 2;
                UpdateUI();
            }
        }

        private void Übersicht_Click(object sender, RoutedEventArgs e)
        {
            if (activeTab != 0)
            {
                activeTab = 0;
                UpdateUI();
            }
        }

        private void UpdateUI()
        {
            Grid.SetColumn(ActiveTabDisplay, activeTab);

            MainContent.Children.Clear();
            if (activeTab == 0)
            {
                if(übersicht == null) übersicht = new Tab_Übersicht();
                MainContent.Children.Add(übersicht);
            }
            else if (activeTab == 2)
            {
                if(erstellen ==null) erstellen = new Tab_Erstellen();
                MainContent.Children.Add(erstellen);
            }
        }
    }
}