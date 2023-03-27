using System.Windows;

namespace CSharpLib
{
    public static class Math
    {
        public static double Lerp(double from, double to, double amount)
        {
            return from + (to - from) * amount;
        }

        public static int Lerp(int from, int to, double amount)
        {
            return from + (int)((to - from) * amount);
        }

        public static Point Lerp(Point from, Point to, double amount)
        {
            return from + (to - from) * amount;
        }
    }
}
