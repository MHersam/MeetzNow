using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using VSTOPrototyp.UI.UserControls;

namespace VSTOPrototyp.UI
{
    public partial class MainForm : Form
    {
        public MainForm()
        {
            InitializeComponent();
            var tabContoller = new TabContoller_Host {Dock = DockStyle.Fill};
            MainPanel.Controls.Add(tabContoller);
        }
    }
}
